import "dotenv/config";
import { makeDB } from "../db/client";
import { items, messages, restaurants, users } from "./drizzle";
import { faker } from "@faker-js/faker";

const { client, db } = makeDB(process.env.DATABASE_URL!);

async function main() {
  await client.insert(users).values({
    email: "nico.03727@gmail.com",
    firstName: "Zaid",
    lastName: "Arshad",
    password: "IAMAPASSWORD",
  });

  for (let i = 0; i < 10; i++) {
    await client.insert(users).values({
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: faker.internet.password(),
    });
  }

  for (let i = 0; i < 10; i++) {
    await client.insert(restaurants).values({
      name: faker.company.name(),
      stars: faker.number.int({ min: 1, max: 5 }),
    });
  }

  const restaurantIds = await client.select().from(restaurants);
  for (let i = 0; i < restaurantIds.length; i++) {
    await client.insert(items).values({
      name: faker.commerce.productName(),
      restaurantId: restaurantIds[i].id,
      description: faker.commerce.productDescription(),
    });
  }

  const userIds = await client.select().from(users);
  for (let i = 0; i < userIds.length; i++) {
    await client.insert(messages).values({
      content: faker.lorem.sentence(),
      senderId: userIds[i].id,
      receiverId: randomElement(userIds).id,
      roomId: faker.string.uuid(),
    });
  }

  db.end();
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

main();
