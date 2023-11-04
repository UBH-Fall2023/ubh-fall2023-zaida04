import "dotenv/config";
import { makeDB } from "../db/client";
import { items, messages, restaurants, users } from "./drizzle";
import { faker } from "@faker-js/faker";

const { client, db } = makeDB(process.env.DATABASE_URL!);

async function main() {
  await client.insert(users).values({
    email: "nico.03727@gmail.com",
    first_name: "Zaid",
    last_name: "Arshad",
    password: "IAMAPASSWORD",
  });

  for (let i = 0; i < 10; i++) {
    await client.insert(users).values({
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      password: faker.internet.password(),
    });
  }

  for (let i = 0; i < 10; i++) {
    await client.insert(restaurants).values({
      name: faker.company.name(),
      stars: faker.number.int({ min: 1, max: 5 }),
    });
  }

  for (let i = 0; i < 10; i++) {
    await client.insert(items).values({
      name: faker.commerce.productName(),
      restaurantId: faker.number.int({ min: 1, max: 10 }),
      description: faker.commerce.productDescription(),
    });
  }

  for (let i = 0; i < 10; i++) {
    await client.insert(messages).values({
      content: faker.lorem.sentence(),
      senderId: faker.number.int({ min: 1, max: 10 }),
      receiverId: faker.number.int({ min: 1, max: 10 }),
    });
  }

  db.end();
}

main();
