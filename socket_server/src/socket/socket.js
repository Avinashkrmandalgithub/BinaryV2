import { Server } from "socket.io";
import http from "http";
import {app} from "../app.js";
import {data} from "../cache/data.js";

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

app.set("io", io);

io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;

  if (!userId) {
    socket.disconnect(true);
    return;
  }

  socket.join(userId);
  data.set("userId", userId);

  console.log("Connected:", userId);

  socket.on("disconnect", () => {
    console.log("Disconnected:", userId);
  });
});

export {
    server
}