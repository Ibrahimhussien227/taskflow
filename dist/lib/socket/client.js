"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocket = getSocket;
const socket_io_client_1 = require("socket.io-client");
let socket = null;
function getSocket() {
    if (!socket) {
        const socketUrl = typeof window !== "undefined"
            ? `${window.location.protocol}//${window.location.host}`
            : "http://localhost:4000";
        socket = (0, socket_io_client_1.io)(socketUrl, {
            transports: ["websocket"],
            autoConnect: true,
        });
    }
    return socket;
}
