import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("nationciteId")?.value;
  const userType = req.cookies.get("userType")?.value;

  const pathname = req.nextUrl.pathname;

  // 🔐 Block unauthenticated users
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // 🧠 Role-based access
  if (pathname.startsWith("/dashboard/researchers") && userType !== "Researcher") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname.startsWith("/dashboard/medical") && userType !== "Medical") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname.startsWith("/dashboard/organizations") && userType !== "Institution") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
