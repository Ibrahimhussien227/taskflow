import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

async function emitEvent<T>(event: string, data: T): Promise<void> {
  try {
    const { getIO } = await import("@/lib/socket/server");

    const io = getIO();
    io.emit(event, data);
    console.log(`📦 Emitted ${event}:`, data);
  } catch (err) {
    console.warn(`Socket emit failed for ${event}:`, err);
  }
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;

    const tasks = await prisma.task.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;
    const body = await req.json();

    const task = await prisma.task.create({
      data: {
        projectId,
        name: body.name,
        status: body.status ?? "Pending",
        priority: body.priority ?? "Medium",
        assignedTo: body.assignedTo ?? null,
      },
    });

    await emitEvent("task_created", task);

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
