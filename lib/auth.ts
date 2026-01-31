import { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/jwt";

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

  return payload;
}
