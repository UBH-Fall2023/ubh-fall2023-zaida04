import "dotenv/config";
import type { NextApiRequest, NextApiResponse } from "next";
import { makeDB } from "@/db/client";
import { items } from "@/db/drizzle";
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
    if (!req.query.itemId) return res.status(404);

    const data = await client.query.items.findFirst({
      where: eq(items.id, req.query.itemId as string),
    }).execute()

    return res.status(200).json({ data });
  }

  return res.status(404);
}
