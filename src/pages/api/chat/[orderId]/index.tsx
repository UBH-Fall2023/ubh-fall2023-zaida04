import type { NextApiRequest, NextApiResponse } from "next";
import { makeDB } from "@/db/client";
import { messages } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { client } = makeDB(process.env.DATABASE_URL!);
  const orderId = req.query.orderId as string;
  if (!orderId) {
    return res.status(400).json({ error: "Missing query params" });
  }

  const existingMessages = await client
    .select()
    .from(messages)
    .where(eq(messages.orderId, orderId));

  const users = await clerkClient.users.getUserList();
  return res.json({ messages: existingMessages, users });
}
