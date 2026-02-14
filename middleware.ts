import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("nationciteId")?.value;
  const userRole = req.cookies.get("userRole")?.value;
  const pathname = req.nextUrl.pathname;

  console.log("[MIDDLEWARE] Check:", { pathname, hasToken: !!token, userRole });

  // Block unauthenticated users
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin-overview")) {
    if (!token) {
      console.log("[MIDDLEWARE] No token found, redirecting...");
      // Redirect to appropriate login page based on attempted route
      if (pathname.startsWith("/admin-overview")) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    
    console.log("[MIDDLEWARE] Token found, allowing access");

    // Role-based access control using cached role from cookie
    // (JWT verification happens server-side in API routes)
    if (pathname.startsWith("/dashboard/researchers") && userRole !== "SCHOLAR") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (pathname.startsWith("/dashboard/medical") && userRole !== "SCHOLAR") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (pathname.startsWith("/dashboard/organizations") && userRole !== "ORG") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (pathname.startsWith("/admin-overview") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-overview/:path*"],
};
