import { NextRequest, NextResponse } from "next/server";
import { signJwt } from "@/lib/jwt";

function getOrigin(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-host");
  const proto = req.headers.get("x-forwarded-proto") || "https";
  if (forwarded) return `${proto}://${forwarded}`;
  const host = req.headers.get("host");
  if (!host) throw new Error("Missing Host header");
  return `${proto}://${host}`;
}

export async function GET(req: NextRequest) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      return NextResponse.json(
        { success: false, message: "GOOGLE_CLIENT_ID is not set" },
        { status: 500 },
      );
    }

    const url = new URL(req.url);
    const mode = url.searchParams.get("mode") || "signin"; // signin | signup
    const loginType = url.searchParams.get("loginType") || "";

    const origin = getOrigin(req);
    const redirectUri = `${origin}/api/auth/google/callback`;

    const stateToken = signJwt({
      mode,
      loginType,
      iat: Math.floor(Date.now() / 1000),
    });

    const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleUrl.searchParams.set("client_id", clientId);
    googleUrl.searchParams.set("redirect_uri", redirectUri);
    googleUrl.searchParams.set("response_type", "code");
    googleUrl.searchParams.set("scope", "openid email profile");
    googleUrl.searchParams.set("prompt", "select_account");
    googleUrl.searchParams.set("access_type", "online");
    googleUrl.searchParams.set("state", stateToken);

    const res = NextResponse.redirect(googleUrl.toString());

    // CSRF-ish binding: require the same state token to come back.
    res.cookies.set("google_oauth_state", stateToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("[GOOGLE_OAUTH] start error:", error);
    return NextResponse.redirect(new URL("/signin?error=google_oauth_start_failed", req.url));
  }
}
