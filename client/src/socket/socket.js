import { io } from "socket.io-client";

export const socket = io(`${import.meta.env.VITE_SOCKET_SERVER_URL}`, {
    autoConnect: false,
    transports: ["websocket", "polling"],
});

export const connectSocket = (userId) => {
    if (!userId) return;

    socket.auth = { userId };
    if (!socket.connected) {
        socket.connect();
    }
};

export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};