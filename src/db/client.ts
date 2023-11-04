import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './drizzle';
import postgres from 'postgres';

export const makeDB = (DATABASE_URL: string) => {
	const db = postgres(DATABASE_URL);
	const client = drizzle(db, { schema });
	return { client, db };
};
