import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const socketUrl =
      typeof window !== "undefined"
        ? `${window.location.protocol}//${window.location.host}`
        : "http://localhost:4000";

    socket = io(socketUrl, {
      transports: ["websocket"],
      autoConnect: true,
    });
  }
  return socket;
}
