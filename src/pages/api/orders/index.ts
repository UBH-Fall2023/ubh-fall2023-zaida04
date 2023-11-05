import "dotenv/config";
import type { NextApiRequest, NextApiResponse } from "next";
import { makeDB } from "@/db/client";
import { orders, items, restaurants, users } from "@/db/drizzle";
import { eq } from "drizzle-orm";

const { client, db } = makeDB(process.env.DATABASE_URL!);

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
  }

  console.log(req.query);

  return res.status(200).json({ message: "Hello from Next.js!" });
}
