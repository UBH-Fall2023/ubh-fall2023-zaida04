import "dotenv/config";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Item, Message, items, messages, orders } from "../db/drizzle";
import { makeDB } from "../db/client";
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
  restaurantName: string;
  checkoutId: string;
};

type OrderForm = {
  name: string;
  location: string;
  tips: number;
  paymentType: Payment;
  urgency: Urgency;
  schedule: string;
  timePlaced: number | null;
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
  });

  socket.on("claimOrder", async (delivererId: string, orderId: string[]) => {
    orderId.forEach(async (orderId: string) => {
      const order = await client.query.orders
        .findFirst({
          where: eq(orders.id, orderId),
        })
        .execute();

      if (!order) return;
      // console.log(order, orderId, delivererId);
      await client
        .update(orders)
        .set({
          delivererId,
          status: "claimed",
        })
        .where(eq(orders.id, order.id));

      io.in(order.ordererId!).emit("orderUpdate", {
        status: "claimed",
        delivererId,
      });
    });
  });

  socket.on(
    "updateOrderStatus",
    async (orderId: string, info: { status: string; delivererId: string }) => {
      const userId = await client
        .update(orders)
        .set({
          status: info.status as any,
        })
        .where(eq(orders.id, orderId))
        .returning();

      // if (info.status === "picked-up") {
      //   setTimeout(
      //     () => {
      //       io.in(userId[0].ordererId!).emit("orderUpdate", {
      //         status: "delivering",
      //       });
      //     },
      //     (Math.random() * (20 - 5) + 5) * 1000,
      //   );
      // }

      io.in(userId[0].ordererId!).emit("orderUpdate", info);
    },
  );

  socket.on("joinRoom", (meId: string) => {
    socket.join(meId);
    console.log(`User ${meId} has joined`);
  });

  socket.on("newMessage", async (m: string) => {
    const msg = JSON.parse(m) as Message;
    console.log(msg.content);

    const inserted = await client
      .insert(messages)
      .values({
        content: msg.content,
        senderId: msg.senderId,
        imageUrls: msg.imageUrls,
        orderId: msg.orderId,
        createdAt: new Date(),
        receiverId: "test",
      })
      .returning();

    const fetchOrder = await client
      .select()
      .from(orders)
      .where(eq(orders.id, msg.orderId!));

    await client
      .update(orders)
      .set({
        messageIds: [...fetchOrder[0].messageIds, inserted[0].id],
      })
      .where(eq(orders.id, msg.orderId!));

    io.in(msg.orderId!).emit("chatMessage", inserted[0]);
  });

  socket.on(
    "order",
    async (
      order: OrderForm & { items: Array<MealItem> } & { orderedId: string },
      ack,
    ) => {
      const checkoutItems: Array<Item> = order.items.map((item) => ({
        stars: item.rating,
        restaurantName: item.restaurantName,
        id: item.checkoutId,
        description: item.description,
        name: item.name,
      }));
      //
      const orderTotal = order.items
        .reduce((prev, curr) => prev + curr.price, 0)
        .toFixed(2);
      const itemEntries = await client
        .insert(items)
        .values(checkoutItems)
        .returning();

        order.tips
      const createdOrder = await client
        .insert(orders)
        .values({
          orderTotal,
          tips: order.tips.toString(),
          status: "ordered",
          paymentType: order.paymentType,
          urgency: order.urgency,
          schedule: order.schedule,
          messageIds: [],
          location: order.location,
          items: itemEntries.map((entry) => entry.id),
          ordererId: order.orderedId,
        })
        .returning();

      console.log("added order!", createdOrder);
      //
      //
      io.in("walkers").emit("order", createdOrder[0]);
      ack?.(createdOrder[0]);
    },
  );

  // socket.on("statusUpdate", (someImportantRoomId: string, status: string) => {
  //   io.in(someImportantRoomId).emit("forwardStatus", { status });
  // });

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
