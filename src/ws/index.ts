import "dotenv/config";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Item, Message, Order, items, messages, orders } from "../db/drizzle";
import { makeDB } from "@/db/client";
import { inspect } from "util";
import express from "express";
import { eq } from "drizzle-orm";

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

type MealItem = {
  id: string;
  name: string;
  dishType: string;
  src?: string;
  description: string;
  dateAdded: number | null;
  price: number;
  rating: number;
  restaurantId: string;
  checkoutId: string;
};

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

  socket.on("joinWalkers", () => {
    socket.join("walkers");
    io.in;
  });

  socket.on("claimOrder", async (delivererId: string, orderId: string[]) => {
    orderId.forEach(async (orderId: string) => {
      const order = await client.query.orders.findFirst({
        where: eq(orders.id, orderId[0])
      }).execute();

      if (!order) return;

      await client.update(orders)
        .set({
          delivererId,
          status: 'claimed',
        })
        .where(eq(orders.id, order.id))

      io.in(order.ordererId).emit('orderUpdate', 'claimed')
    })
  })

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

  socket.on(
    "order",
    async (
      order: OrderForm & { items: Array<MealItem> } & { orderedId: string },
      ack,
    ) => {
      const checkoutItems: Array<Item> = order.items.map((item) => ({
        stars: item.rating,
        restaurantId: item.restaurantId,
        id: item.checkoutId,
        description: item.description,
        name: item.name,
      }));

      const orderTotal = order.items
        .reduce((prev, curr) => prev + curr.price, 0)
        .toFixed(2);
      const itemEntries = await client
        .insert(items)
        .values(checkoutItems)
        .returning();

      await client.insert(orders).values({
        orderTotal,
        tips: "123",
        items: itemEntries.map((entry) => entry.id),
        ordererId: order.orderedId,
      });

      console.log("added order!");
      //

      io.in("walkers").emit("order", order);
      ack();
    },
  );

  socket.on("connected-count", (ack) => {
    ack([...io.sockets.adapter.rooms.values()].length);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
