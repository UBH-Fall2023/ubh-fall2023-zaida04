import 'dotenv/config';
import { makeDB } from '../db/client';
import { users, projects, logs } from './drizzle';
import { eq } from 'drizzle-orm';

const { client, db } = makeDB(process.env.DATABASE_URL!);

async function main() {
	await client.insert(users).values({
		id: 1,
		email: 'nico.03727@gmail.com',
		name: 'Zaid'
	});

	await client.insert(projects).values({
		id: 1,
		name: 'My First Project',
		ownerId: 1
	});

	await client.insert(logs).values({
		id: 1,
		projectId: 1,
		generatedAt: new Date(),
		receivedAt: new Date(new Date().getTime() + 1000),
		content: 'Hello World!'
	});
	db.end();
}

main();
