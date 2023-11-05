import "dotenv/config";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Message, messages, orders } from "../db/drizzle";
import { makeDB } from "@/db/client";

import express from "express";
enum Urgency {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}
enum Payment {
  VENMO = "venmo",
  CASHAPP = "cashapp",
  CASH = "cash",
}
type OrderForm = {
  name: string;
  location: string;
  paymentType: Payment;
  urgency: Urgency;
  schedule: string;
};
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

  // socket.on('joinDelivers', ())

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
      imageUrls: msg.imageUrls,
      createdAt: new Date(),
      receiverId: msg.receiverId,
    });
    console.log(
      `New message: ${msg.content} from user ${msg.senderId} to user ${msg.receiverId}`,
    );

    io.in(msg.receiverId).emit("chatMessage", msg);
    io.in(msg.senderId).emit("chatMessage", msg);
  });

  socket.on("order", async (m: OrderForm) => {
    console.log({ m });

    // await client.insert(orders).values({

    // })
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
