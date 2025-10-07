import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { signAccessToken, verifyToken } from "@/lib/auth/jwt";
import { UserPayload } from "@/types/auth/auth.type";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token" },
      { status: 401 }
    );
  }

  const user = await verifyToken<UserPayload>(refreshToken);
  if (!user) {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 403 }
    );
  }

  const newAccessToken = await signAccessToken(user);

  const res = NextResponse.json({ success: true });
  res.cookies.set("accessToken", newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60,
    path: "/",
  });

  return res;
}
