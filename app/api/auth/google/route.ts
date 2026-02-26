import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "@/lib/prisma";
import { signJwt } from "@/lib/jwt";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Google token missing" },
        { status: 400 }
      );
    }

    // 1️⃣ Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.sub) {
      return NextResponse.json(
        { error: "Invalid Google token" },
        { status: 400 }
      );
    }

    const email = payload.email;
    const googleId = payload.sub;

    // 2️⃣ Check if user exists in AuthUser
    const user = await prisma.authUser.findUnique({
      where: { email },
      include: { registration: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "You are not registered in NationCite" },
        { status: 403 }
      );
    }

    // 3️⃣ Ensure registration approved
    if (!user.registration || user.registration.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Your registration is not approved yet" },
        { status: 403 }
      );
    }

    // 4️⃣ Ensure account active
    if (!user.isActive) {
      return NextResponse.json(
        { error: "Account is inactive" },
        { status: 403 }
      );
    }

    // 5️⃣ Bind Google account if first time login
    if (!user.googleId) {
      await prisma.authUser.update({
        where: { id: user.id },
        data: { googleId },
      });
    }

    // 6️⃣ If googleId already exists, ensure it matches
    if (user.googleId && user.googleId !== googleId) {
      return NextResponse.json(
        { error: "Google account mismatch" },
        { status: 403 }
      );
    }

    // 7️⃣ Generate YOUR JWT
    const jwtToken = signJwt({
      userId: user.id,
      email: user.email,
      role: user.role,
      registrationId: user.registration.id,
    });

    // 8️⃣ Update last login
    await prisma.authUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // 9️⃣ Return token
    return NextResponse.json({
      message: "Google login successful",
      token: jwtToken,
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    return NextResponse.json(
      { error: "Google authentication failed" },
      { status: 500 }
    );
  }
}