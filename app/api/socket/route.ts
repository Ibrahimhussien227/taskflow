import { NextResponse } from "next/server";
import { Server as IOServer } from "socket.io";

declare global {
  // This ensures we keep one global instance across hot reloads
  // and avoids "Socket already initialized" errors.

  var io: IOServer | undefined;
}

export async function GET() {
  if (!global.io) {
    // Initialize Socket.IO server once
    global.io = new IOServer({
      cors: {
        origin: "*",
      },
    });

    global.io.on("connection", (socket) => {
      console.log("🟢 Socket connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("🔴 Socket disconnected:", socket.id);
      });
    });

    console.log("✅ Socket.IO initialized via /api/socket route");
  }

  return NextResponse.json({
    message: "Socket.IO server is running",
  });
}
