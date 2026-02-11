import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    });

    // Clear authentication cookies
    response.cookies.delete("nationciteId");
    response.cookies.delete("userRole");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: "Logout failed" },
      { status: 500 }
    );
  }
}

// Support PATCH for backwards compatibility
export async function PATCH(req: NextRequest) {
  return POST(req);
}
