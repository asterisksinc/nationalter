import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  try {
    // Validate token (throws if invalid)
    const payload = requireAuth(req);

    return NextResponse.json({
      success: true,
      message: "Logout successful",
      data: {
        user: payload,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
}
