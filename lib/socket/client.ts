import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") ||
      window.location.origin;

    socket = io(baseUrl, {
      path: "/api/socket",
      transports: ["websocket"],
      autoConnect: true,
    });
  }

  return socket;
}
