import { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import { UserRole } from "@prisma/client";

/**
 * Authenticates user by verifying JWT token from Authorization header or cookies
 * This function should ONLY be used in Node.js runtime (API routes, server actions)
 * Do NOT use this in middleware (which runs in Edge Runtime)
 */
export function requireAuth(req: NextRequest) {
  // Try to get token from Authorization header first (for API calls)
  const authHeader = req.headers.get("authorization");
  
  let token: string | undefined;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    // Fallback to cookie (for server-side rendering in Node.js runtime)
    token = req.cookies.get("nationciteId")?.value;
  }

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = verifyJwt(token);

  if (!payload) {
    throw new Error("Invalid or expired token");
  }

  return payload; // { userId, email, role, registrationId }
}

export function requireAdmin(req: NextRequest) {
  const payload = requireAuth(req);

  if (payload.role !== UserRole.ADMIN) {
    throw new Error("Forbidden: Admin access required");
  }

  return payload;
}
