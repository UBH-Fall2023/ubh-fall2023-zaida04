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
  socket.on("joinRoom", (roomId: string) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("newMessage", (m: string) => {
    const msg = JSON.parse(m) as Message;
    console.log(`New message: ${msg.content} to room ${msg.roomId}`);
    console.log(io.sockets.adapter.rooms);
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
