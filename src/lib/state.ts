import { Message } from "@/db/drizzle";
import { atom } from "jotai";

export const messageAtoms = atom<Message[]>([
  {
    id: "1",
    content: "Hello World",
    createdAt: new Date(),
    senderId: "2",
    receiverId: "1",
  },
  {
    id: "2",
    content: "Hello World 2",
    createdAt: new Date(),
    senderId: "1",
    receiverId: "2",
  },
]);
