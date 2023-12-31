import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  text,
  integer,
  uuid,
  numeric,
} from "drizzle-orm/pg-core";

const id = (name?: string) =>
  uuid(name ?? "id")
    .primaryKey()
    .defaultRandom();

const singleId = (name: string) => text(name).notNull();

const idArray = (name: string) => text(name).array().notNull();

// export const users = pgTable("users", {
//   id: text("id").primaryKey(),
//   firstName: text("firstName").notNull(),
//   lastName: text("lastName").notNull(),
//   email: text("email").notNull(),
//   password: text("password"), // nullable since it's suffixed with a question mark
//   oauthProvider: text("oauthProvider"), // nullable
//   oauthId: text("oauthId"), // nullable
//   oauthAccessToken: text("oauthAccessToken"), // nullable
//   oauthRefreshToken: text("oauthRefreshToken"), // nullable
// });
// export type User = typeof users.$inferSelect;

// export const restaurants = pgTable("restaurants", {
//   id: id(),
//   name: text("name").notNull(),
//   stars: integer("stars"), // Assuming integer is a valid type function similar to serial or text
// });
// export type Restaurant = typeof restaurants.$inferSelect;

export const items = pgTable("items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  stars: integer("stars"), // Assuming integer is a valid type function similar to serial or text
  restaurantName: text("restaurant-name"),
});
export type Item = typeof items.$inferSelect;
// export const item_relation = relations(items, ({ one }) => {
//   return {
//     restaurant: one(restaurants, {
//       fields: [items.restaurantId],
//       references: [restaurants.id],
//     }),
//   };
// });

export const orders = pgTable("orders", {
  id: id(),
  orderTotal: numeric("orderTotal").notNull(),
  createdAt: timestamp("createdAt").$defaultFn(() => new Date()),
  tips: numeric("tips").notNull(),
  items: idArray("items"),
  ordererId: text("ordererId"),
  delivererId: text("delivererId"),
  paymentType: text("paymentType"),
  schedule: text("schedule"),
  urgency: text("urgency"),
  location: text("location"),
  messageIds: idArray("messageIds"),
  status: text("status", {
    enum: [
      "ordered",
      "claimed",
      "picked-up",
      "delivering",
      "delivered",
      "archived",
      "cancelled",
    ],
  }),
});
export type Order = typeof orders.$inferSelect;
export const order_relation = relations(orders, ({ many }) => {
  return {
    // orderer: one(users, {
    //   fields: [orders.ordererId],
    //   references: [users.id],
    // }),
    // deliverer: one(users, {
    //   fields: [orders.delivererId],
    //   references: [users.id],
    // }),
    items: many(items),
  };
});

export const messages = pgTable("messages", {
  id: id(),
  content: text("content").notNull(),
  // roomId: uuid("roomId"),
  orderId: text("orderId"),
  createdAt: timestamp("createdAt").$defaultFn(() => new Date()),
  senderId: singleId("senderId"),
  imageUrls: text("imageUrl").array(),
  receiverId: singleId("receiverId"),
});
export type Message = typeof messages.$inferSelect;
export const message_relation = relations(messages, ({ one }) => {
  return {
    // sender: one(users, {
    //   fields: [messages.senderId],
    //   references: [users.id],
    // }),
    // receiver: one(users, {
    //   fields: [messages.receiverId],
    //   references: [users.id],
    // }),
    // room: one(rooms, {
    //   fields: [messages.roomId],
    //   references: [rooms.id],
    // }),
  };
});

// export const rooms = pgTable("rooms", {
//   id: id(),
//   // For foreign key arrays, assuming the library allows for an array of references
//   chatterIDs: idArray("chatterIDs"),
//   messageIDs: idArray("messageIDs"),
// });
// export type Room = typeof rooms.$inferSelect;

// export const rooms_relations = relations(messages, ({ many }) => {
//   return {
//     messages: many(messages),
//     chatters: many(users),
//   };
// });
