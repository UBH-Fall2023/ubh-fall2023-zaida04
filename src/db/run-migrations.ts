import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { makeDB } from './client';
import { join } from 'node:path';

if (!process.env.DATABASE_URL) {
	console.error('DATABASE_URL environment variable is required');
	process.exit(1);
}

// this will automatically run needed migrations on the database
async function main() {
	console.log('Running migrations');
	migrate(makeDB(process.env.DATABASE_URL!).client, {
		migrationsFolder: join(process.cwd(), 'drizzle')
	})
		.then(() => {
			console.log('Migrations complete!');
			process.exit(0);
		})
		.catch((err) => {
			console.error('Migrations failed!', err);
			process.exit(1);
		});
}

main();
