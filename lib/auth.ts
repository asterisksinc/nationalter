import { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import { UserRole } from "@prisma/client";

export function requireAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyJwt(token);

  if (!payload) {
    throw new Error("Invalid or expired token");
  }

  return payload; // { userId, email, role }
}

export function requireAdmin(req: NextRequest) {
  const payload = requireAuth(req);

  if (payload.role !== UserRole.ADMIN) {
    throw new Error("Forbidden: Admin access required");
  }

  return payload;
}
