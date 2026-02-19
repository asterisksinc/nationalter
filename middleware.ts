import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // 🔥 TEMP: allow everything
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-overview/:path*"],
};
