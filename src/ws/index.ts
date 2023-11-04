import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Message } from "../db/drizzle";

import express from "express";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow only GET and POST requests
  },
});

app.get("/", (req, res) => res.json({ message: "Hello world!" }));

io.on("connection", (socket: Socket) => {
  console.log("a user connected");

  socket.on("joinRoom", (roomId: string) => {
    socket.join(roomId);
    const roomSizeOr0 = io.sockets.adapter.rooms.get(roomId)?.size || 0;

    console.log(
      `User joined room: ${roomId}. Room has ${roomSizeOr0 + 1} users`,
    );
  });

  socket.on("newMessage", (m: string) => {
    const msg = JSON.parse(m) as Message;
    console.log(`New message: ${msg.content} to room ${msg.roomId}`);

    io.in(msg.roomId).emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
