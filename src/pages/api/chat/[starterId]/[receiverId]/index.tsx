import type { NextApiRequest, NextApiResponse } from "next";
import { makeDB } from "@/db/client";
import { messages } from "@/db/drizzle";
import { and, eq, or } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs";

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

  console.log(starterId, receiverId);
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

  const users = await clerkClient.users.getUserList();
  const fetchedUsers = await users.filter((user) => {
    return user.id === starterId || user.id === receiverId;
  });
  return res.json({ messages: existingMessages, users: fetchedUsers });
}
