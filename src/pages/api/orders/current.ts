import type { NextApiRequest, NextApiResponse } from "next";
import { makeDB } from "@/db/client";
import { items, orders } from "@/db/drizzle";
import { and, eq, inArray } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs";

const { client, db } = makeDB(process.env.DATABASE_URL!);

type ResponseData = {
  message: string;
  items?: any;
  users?: any;
  fetchedItems?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const delivererId = req.query.delivererId as string;
  if (!delivererId) {
    res.status(400).json({ message: "Deliverer ID is required" });
    return;
  }

  console.log(delivererId);
  console.log(1);
  const fetchedOrders = await client.query.orders.findMany({
    where: and(
      eq(orders.delivererId, delivererId),
      eq(orders.status, "claimed"),
    ),
  });
  const fetchedItems = await client.query.items.findMany({
    where: inArray(
      items.id,
      fetchedOrders.reduce((acc, cur) => [...acc, ...cur.items], [
        "none",
      ] as string[]),
    ),
  });
  console.log(2);

  const users = await clerkClient.users.getUserList();
  // await client.update(orders)
  //   .set({ status: 'ordered'})
  //   .where(eq(orders.id, '438dbe27-0887-4d73-a9dd-141e1ab2ef99'))

  // if (req.method === "POST") {
  //   const
  // } else {
  // }
  res.status(200).json({
    message: "Hello from Next.js!",
    items: fetchedOrders,
    users,
    fetchedItems,
  });
}
