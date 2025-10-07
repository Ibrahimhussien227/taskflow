import { NextResponse } from "next/server";

import { signAccessToken, signRefreshToken } from "@/lib/auth/jwt";
import { findUser } from "@/lib/auth/fakedb/users";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = findUser(email, password);

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const accessToken = await signAccessToken(user);
  const refreshToken = await signRefreshToken(user);

  const res = NextResponse.json({ success: true, user });

  res.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60,
    path: "/",
  });

  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return res;
}
