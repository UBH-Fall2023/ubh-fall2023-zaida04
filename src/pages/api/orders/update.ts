import type { NextApiRequest, NextApiResponse } from "next";
import { makeDB } from "@/db/client";
import { orders } from "@/db/drizzle";
import { eq } from 'drizzle-orm'

const { client, db } = makeDB(process.env.DATABASE_URL!);

type ResponseData = {
  message: string;
  items?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const order = await client.query.orders.findFirst()
  // await client.update(orders)
  //   .set({ status: 'ordered'})
  //   .where(eq(orders.id, '438dbe27-0887-4d73-a9dd-141e1ab2ef99'))

  // if (req.method === "POST") {
  //   const
  // } else {
  // }
  res.status(200).json({ message: "Hello from Next.js!", items: orders });
}
