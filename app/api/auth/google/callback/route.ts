import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signJwt, verifyJwt } from "@/lib/jwt";
import { LoginType } from "@prisma/client";

function getOrigin(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-host");
  const proto = req.headers.get("x-forwarded-proto") || "https";
  if (forwarded) return `${proto}://${forwarded}`;
  const host = req.headers.get("host");
  if (!host) throw new Error("Missing Host header");
  return `${proto}://${host}`;
}

function redirectWithError(basePath: string, error: string) {
  const u = new URL(basePath, "http://local");
  u.searchParams.set("error", error);
  return u.pathname + u.search;
}

function redirectFromReq(req: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, req.url));
}

export async function GET(req: NextRequest) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return redirectFromReq(req, "/signin?error=google_oauth_not_configured");
    }

    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code || !state) {
      return redirectFromReq(req, "/signin?error=google_oauth_invalid_callback");
    }

    const stateCookie = req.cookies.get("google_oauth_state")?.value;
    if (!stateCookie || stateCookie !== state) {
      return redirectFromReq(req, "/signin?error=google_oauth_state_mismatch");
    }

    const statePayload = verifyJwt(state);
    const modeRaw =
      statePayload && typeof (statePayload as Record<string, unknown>).mode === "string"
        ? String((statePayload as Record<string, unknown>).mode)
        : "signin";
    const mode = modeRaw === "signup" ? "signup" : "signin";

    const origin = getOrigin(req);
    const redirectUri = `${origin}/api/auth/google/callback`;

    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      console.error("[GOOGLE_OAUTH] token exchange failed", await tokenRes.text());
      return redirectFromReq(req, "/signin?error=google_oauth_token_exchange_failed");
    }

    const tokenJson = (await tokenRes.json()) as {
      access_token?: string;
      id_token?: string;
    };

    if (!tokenJson.access_token) {
      return redirectFromReq(req, "/signin?error=google_oauth_missing_access_token");
    }

    // Fetch user profile
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenJson.access_token}`,
      },
    });

    if (!profileRes.ok) {
      console.error("[GOOGLE_OAUTH] userinfo failed", await profileRes.text());
      return redirectFromReq(req, "/signin?error=google_oauth_userinfo_failed");
    }

    const profile = (await profileRes.json()) as {
      email?: string;
      email_verified?: boolean;
      name?: string;
      given_name?: string;
      family_name?: string;
      picture?: string;
    };

    const email = String(profile.email ?? "").trim().toLowerCase();
    if (!email) {
      return redirectFromReq(req, "/signin?error=google_oauth_missing_email");
    }

    // SIGNUP MODE: just prefill and let the user continue the existing registration flow.
    if (mode === "signup") {
      const redirect = new URL("/signup", origin);
      redirect.searchParams.set("email", email);
      if (profile.name) redirect.searchParams.set("name", profile.name);

      const res = NextResponse.redirect(redirect.toString());
      res.cookies.delete("google_oauth_state");
      return res;
    }

    // SIGNIN MODE: must map to an existing approved account (AuthUser).
    const user = await prisma.authUser.findUnique({
      where: { email },
      include: { registration: true },
    });

    if (!user || !user.isActive) {
      const redirect = new URL(redirectWithError("/signin", "google_oauth_no_account"), origin);
      const res = NextResponse.redirect(redirect.toString());
      res.cookies.delete("google_oauth_state");
      return res;
    }

    const role = user.role;
    const registrationType = user.registration?.type ?? null;

    // Create JWT session (same shape as /api/auth/login)
    const sessionToken = signJwt({
      userId: user.id,
      email: user.email,
      role,
      registrationId: user.registration?.id ?? null,
      nationciteId: user.registration?.nationciteId ?? null,
    });

    await prisma.authUser.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        isEmailVerified: profile.email_verified ?? user.isEmailVerified,
      },
    });

    let loginLogType: LoginType;
    if (role === "ADMIN") {
      loginLogType = LoginType.ADMIN;
    } else if (registrationType === "RESEARCHER") {
      loginLogType = LoginType.RESEARCHER;
    } else if (registrationType === "MEDICAL") {
      loginLogType = LoginType.MEDICAL_PROFESSIONAL;
    } else if (registrationType === "ORG") {
      loginLogType = LoginType.ORG;
    } else {
      // Fallback for accounts without linked registration (should be rare)
      loginLogType = LoginType.RESEARCHER;
    }

    await prisma.loginLog.create({
      data: {
        nationciteId: user.registration?.nationciteId || `ADMIN-${user.id}`,
        loginType: loginLogType,
      },
    });

    // Role-based redirect
    let redirectPath = "/dashboard";
    if (role === "ADMIN") redirectPath = "/admin-overview";
    else if (role === "ORG") redirectPath = "/dashboard/organizations";
    else if (role === "SCHOLAR") {
      if (registrationType === "MEDICAL") redirectPath = "/dashboard/medical";
      else redirectPath = "/dashboard/researchers";
    }

    const redirect = new URL(redirectPath, origin);
    const res = NextResponse.redirect(redirect.toString());

    res.cookies.set("nationciteId", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    res.cookies.set("userRole", role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    if (registrationType) {
      res.cookies.set("registrationType", registrationType, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }

    res.cookies.delete("google_oauth_state");
    return res;
  } catch (error) {
    console.error("[GOOGLE_OAUTH] callback error:", error);
    return redirectFromReq(req, "/signin?error=google_oauth_callback_failed");
  }
}
