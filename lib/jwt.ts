import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

function getJwtSecret(): jwt.Secret | null {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET is not defined");
    return null;
  }

  return secret as jwt.Secret;
}

const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"];

export function signJwt(payload: JwtPayload): string {
  const secret = getJwtSecret();

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(payload, secret, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    const secret = getJwtSecret();
    if (!secret) return null;

    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
