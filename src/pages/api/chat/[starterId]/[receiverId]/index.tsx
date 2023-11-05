import type { NextApiRequest, NextApiResponse } from "next";
import { makeDB } from "@/db/client";
import { messages, users } from "@/db/drizzle";
import { and, eq, or } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { client } = makeDB(process.env.DATABASE_URL!);

  const starterId = req.query.starterId as string;
  const receiverId = req.query.receiverId as string;

  if (!starterId || !receiverId) {
    return res.status(400).json({ error: "Missing query params" });
  }

  const existingMessages = await client
    .select()
    .from(messages)
    .where(
      and(
        or(eq(messages.senderId, starterId), eq(messages.senderId, receiverId)),
        or(
          eq(messages.receiverId, starterId),
          eq(messages.receiverId, receiverId),
        ),
      ),
    );

  const fetchedUsers = await client
    .select()
    .from(users)
    .where(or(eq(users.id, starterId), eq(users.id, receiverId)));

  return res.json({ messages: existingMessages, users: fetchedUsers });
}