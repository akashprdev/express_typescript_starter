import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL || '';

const sql = neon(databaseUrl!);
const db = drizzle(sql, { schema });

export default db;
