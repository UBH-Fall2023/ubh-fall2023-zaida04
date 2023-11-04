import { pgTable, timestamp, text, integer, uuid } from "drizzle-orm/pg-core";

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

export const orders = pgTable("orders", {
  id: id(),
  items: idArray("items"),
  ordererId: singleId("ordererId"),
});
export type Order = typeof orders.$inferSelect;

export const messages = pgTable("messages", {
  id: id(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .$defaultFn(() => new Date()),
  senderId: singleId("senderId"),
  receiverId: singleId("receiverId"),
});
export type Message = typeof messages.$inferSelect;

export const rooms = pgTable("rooms", {
  id: id(),
  // For foreign key arrays, assuming the library allows for an array of references
  chatterIDs: idArray("chatterIDs"),
  messageIDs: idArray("messageIDs"),
});
export type Room = typeof rooms.$inferSelect;
