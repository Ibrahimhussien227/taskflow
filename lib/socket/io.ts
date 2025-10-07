import { Server as IOServer } from "socket.io";
import type { IncomingMessage, ServerResponse } from "http";

let io: IOServer | null = null;

export function initIO(
  httpServer?: import("http").Server<
    typeof IncomingMessage,
    typeof ServerResponse
  >
): IOServer {
  if (!io && httpServer) {
    io = new IOServer(httpServer, {
      path: "/api/socket",
      cors: {
        origin: process.env.NEXT_PUBLIC_API_BASE_URL?.replace(
          "/api",
          ""
        ),
        methods: ["GET", "POST", "PATCH", "DELETE"],
      },
    });

    io.on("connection", (socket) => {
      console.log("✅ Socket connected:", socket.id);
      socket.on("disconnect", () => {
        console.log("❌ Socket disconnected:", socket.id);
      });
    });
  }

  return io!;
}

export function getIO(): IOServer | null {
  return io;
}
