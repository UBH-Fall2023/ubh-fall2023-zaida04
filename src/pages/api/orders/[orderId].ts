import { makeDB } from "@/db/client";
import { orders } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { db, client } = makeDB(process.env.DATABASE_URL!);
  const orderId = req.query.orderId as string;

  if (req.method === "GET") {
    const order = await client
      .select()
      .from(orders)
      .where(eq(orders.id, orderId));

    res.status(200).json({ order: order[0] });
  }
}
