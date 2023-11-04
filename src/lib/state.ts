import { Message } from "@/db/drizzle";
import { atom } from "jotai";

export const messageAtoms = atom<Message[]>([]);
