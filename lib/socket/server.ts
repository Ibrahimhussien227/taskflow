import { Server as IOServer } from "socket.io";
import { Server } from "http";

let io: IOServer | null = null;

export function initIO(server: Server) {
  if (!io) {
    io = new IOServer(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH", "DELETE"],
      },
    });

    // Centralized connection handling
    io.on("connection", (socket) => {
      console.log("✅ Client connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
      });
    });
  }
  return io;
}

export function getIO(): IOServer {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
}
