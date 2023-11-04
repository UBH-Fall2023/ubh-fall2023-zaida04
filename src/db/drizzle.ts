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

const singleId = (name: string) => uuid(name).notNull();

const idArray = (name: string) => uuid(name).array().notNull();

export const users = pgTable("users", {
  id: id(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  email: text("email").notNull(),
  password: text("password"), // nullable since it's suffixed with a question mark
  oauthProvider: text("oauthProvider"), // nullable
  oauthId: text("oauthId"), // nullable
  oauthAccessToken: text("oauthAccessToken"), // nullable
  oauthRefreshToken: text("oauthRefreshToken"), // nullable
});
export type User = typeof users.$inferSelect;

export const restaurants = pgTable("restaurants", {
  id: id(),
  name: text("name").notNull(),
  stars: integer("stars"), // Assuming integer is a valid type function similar to serial or text
});
export type Restaurant = typeof restaurants.$inferSelect;

export const items = pgTable("items", {
  id: id(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  stars: integer("stars"), // Assuming integer is a valid type function similar to serial or text
  restaurantId: singleId("restaurantId"),
});
export type Item = typeof items.$inferSelect;
export const item_relation = relations(items, ({ one }) => {
  return {
    restaurant: one(restaurants, {
      fields: [items.restaurantId],
      references: [restaurants.id],
    }),
  };
});

export const orders = pgTable("orders", {
  id: id(),
  orderTotal: numeric("orderTotal").notNull(),
  createdAt: timestamp("createdAt").$defaultFn(() => new Date()),
  tips: numeric("tips").notNull(),
  items: idArray("items"),
  ordererId: singleId("ordererId"),
});
export type Order = typeof orders.$inferSelect;
export const order_relation = relations(orders, ({ one }) => {
  return {
    orderer: one(users, {
      fields: [orders.ordererId],
      references: [users.id],
    }),
    items: one(items, {
      fields: [orders.items],
      references: [items.id],
    }),
  };
});

export const messages = pgTable("messages", {
  id: id(),
  content: text("content").notNull(),
  // roomId: uuid("roomId"),
  createdAt: timestamp("createdAt").$defaultFn(() => new Date()),
  senderId: singleId("senderId"),
  receiverId: singleId("receiverId"),
});
export type Message = typeof messages.$inferSelect;
export const message_relation = relations(messages, ({ one }) => {
  return {
    sender: one(users, {
      fields: [messages.senderId],
      references: [users.id],
    }),
    receiver: one(users, {
      fields: [messages.receiverId],
      references: [users.id],
    }),
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
