import "dotenv/config";
import type { NextApiRequest, NextApiResponse } from "next";
import { makeDB } from "@/db/client";
import { orders } from "@/db/drizzle";
import { eq } from "drizzle-orm";

const { client } = makeDB(process.env.DATABASE_URL!);

type ResponseData = {
  message?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === "GET") {
    const data = await client.query.orders.findMany({
      where: eq(orders.status, "ordered"),
    });

    return res.status(200).json({ data });
    // await client.update(orders)
    //   .set({
    //     ordererId: 'user_2XkKcE1kELK3dZSA9Etaz8fspXl',
    //     status: 'ordered',
    //   })
    //   .where(eq(orders.id, '1a302c42-5655-40c2-a348-65c526a6aed4'))
  }

  return res.status(200).json({ message: "Hello from Next.js!" });

  // Create a route to accept/claim order

  // Create a route to send updates to order
}
