import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("nationciteId")?.value;
  const userRole = req.cookies.get("userRole")?.value;
  const registrationType = req.cookies.get("registrationType")?.value;
  const pathname = req.nextUrl.pathname;

  console.log("[MIDDLEWARE] Check:", { pathname, hasToken: !!token, userRole, registrationType });

  // Block unauthenticated users for dashboard paths only
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      console.log("[MIDDLEWARE] No token found, redirecting...");
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    console.log("[MIDDLEWARE] Token found, allowing access");

    // Role-based access control using cached role from cookie
    // (JWT verification happens server-side in API routes)
    if (pathname.startsWith("/dashboard/researchers") && registrationType !== "RESEARCHER") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (pathname.startsWith("/dashboard/medical") && registrationType !== "MEDICAL") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (pathname.startsWith("/dashboard/organizations") && userRole !== "ORG") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};