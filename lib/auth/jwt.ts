import { UserPayload } from "@/types/auth/auth.type";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "supersecret"
);
const ACCESS_EXPIRES_IN = 15 * 60; // 15 minutes
const REFRESH_EXPIRES_IN = 7 * 24 * 60 * 60; // 7 days

// Generate Access Token
export async function signAccessToken(user: UserPayload) {
  return await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ACCESS_EXPIRES_IN}s`)
    .sign(JWT_SECRET);
}

// Generate Refresh Token
export async function signRefreshToken(user: UserPayload) {
  return await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${REFRESH_EXPIRES_IN}s`)
    .sign(JWT_SECRET);
}

// Verify any token
export async function verifyToken<T>(
  token: string
): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as T;
  } catch {
    return null;
  }
}
