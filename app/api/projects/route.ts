import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token)
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );

    const projects = await prisma.project.findMany();

    return NextResponse.json(projects, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Projects API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const project = await prisma.project.create({ data: body });
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
