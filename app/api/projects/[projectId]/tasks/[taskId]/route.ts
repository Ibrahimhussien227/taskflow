import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getIO } from "@/lib/socket/io";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ projectId: string; taskId: string }> }
) {
  try {
    const { taskId } = await context.params;
    const body = await req.json();

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        name: body.name,
        status: body.status,
        priority: body.priority,
        assignedTo: body.assignedTo,
      },
    });

    getIO()?.emit("task:updated", updatedTask);

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ projectId: string; taskId: string }> }
) {
  try {
    const { taskId } = await context.params;

    const deletedTask = await prisma.task.delete({
      where: { id: taskId },
    });

    getIO()?.emit("task:deleted", deletedTask.id);

    return NextResponse.json(deletedTask, { status: 200 });
  } catch (error) {
    console.error("DELETE TASK ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
