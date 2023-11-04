import "dotenv/config";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Message, messages } from "../db/drizzle";
import { makeDB } from "@/db/client";

import express from "express";

const app = express();
const { client } = makeDB(process.env.DATABASE_URL!);
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

  socket.on("joinRoom", (meId: string) => {
    socket.join(meId);
    console.log(`User ${meId} has joined`);
  });

  socket.on("newMessage", async (m: string) => {
    const msg = JSON.parse(m) as Message;
    console.log(msg.content);

    await client.insert(messages).values({
      content: msg.content,
      senderId: msg.senderId,
      createdAt: new Date(),
      receiverId: msg.receiverId,
    });
    console.log(
      `New message: ${msg.content} from user ${msg.senderId} to user ${msg.receiverId}`,
    );

    io.in(msg.receiverId).emit("chatMessage", msg);
    io.in(msg.senderId).emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
