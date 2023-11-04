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
  if (req.method === 'GET') {
    const data = await client.query.orders.findMany({
      where: eq(
        orders.status, 'ordered'
      )
    })

    return res.status(200).json({ data })
  }
  // const { slug } = req.query;

  console.log(req.query)

  // console.log(slug);

  // if (!slug) {
  //   return res.status(404);
  // }

  // if (slug[0] === 'retrieve') {
  //   // const allPendingOrders =
  // }

  // if (slug[0] === 'claim') {

  // }

  // if (slug[0] === 'update') {
  //   const queriedOrder = await client.query.orders.findFirst();
  //   console.log(queriedOrder);

  //   return res.status(200).json({ message: 'Hello!', items: queriedOrder})
  // }

  return res.status(200).json({ message: "Hello from Next.js!"});


  return res.status(404)


  // Create a route to grab all orders

  // Create a route to accept/claim order

  // Create a route to send updates to order


  // if (req.method === "POST") {
  // } else {
  // }

  // const queriedItems = await client.query.items.findMany()

  // await client.insert(orders).values({
  //   orderTotal: "10.79",
  //   tips: "3.00",
  //   items: queriedItems.map(item => item.id).slice(0, 3),
  //   ordererId: "b527cd9b-3811-4cb7-ae5c-44fcafed3d3e",
  // })

  res.status(200).json({ message: "Hello from Next.js!"});
}
