import { pgTable, serial, text, integer, json } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  password: text("password"), // nullable since it's suffixed with a question mark
  oauthProvider: text("oauthProvider"), // nullable
  oauthId: text("oauthId"), // nullable
  oauthAccessToken: text("oauthAccessToken"), // nullable
  oauthRefreshToken: text("oauthRefreshToken"), // nullable
});
export type User = typeof users.$inferSelect;

export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  stars: integer("stars"), // Assuming integer is a valid type function similar to serial or text
});
export type Restaurant = typeof restaurants.$inferSelect;

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  stars: integer("stars"), // Assuming integer is a valid type function similar to serial or text
  restaurantId: serial("restaurantId").notNull(),
});
export type Item = typeof items.$inferSelect;

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  items: serial("items").array().notNull(),
  ordererId: serial("ordererId"),
});
export type Order = typeof orders.$inferSelect;

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  senderId: serial("senderId"),
  receiverId: serial("receiverId"),
});
export type Message = typeof messages.$inferSelect;

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  // For foreign key arrays, assuming the library allows for an array of references
  chatterIDs: serial("chatterIDs").array().notNull(),
  messageIDs: serial("messageIDs").array().notNull(),
});
export type Room = typeof rooms.$inferSelect;
