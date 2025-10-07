"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initIO = initIO;
exports.getIO = getIO;
const socket_io_1 = require("socket.io");
let io = null;
function initIO(server) {
    if (!io) {
        io = new socket_io_1.Server(server, {
            cors: {
                origin: process.env.NEXT_PUBLIC_API_URL,
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
function getIO() {
    if (!io)
        throw new Error("Socket.io not initialized!");
    return io;
}
