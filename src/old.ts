import { makeDB } from "./db/client";
import { items, messages, orders } from "./db/drizzle";
const { client, db } = makeDB(
  "postgres://postgres:d1E*bAa2c3d5b65F25efgBcbDbCcbbag@viaduct.proxy.rlwy.net:17341/railway",
);

async function main() {
  await client.delete(items);
  await client.delete(orders);
  await client.delete(messages);
}

main();
