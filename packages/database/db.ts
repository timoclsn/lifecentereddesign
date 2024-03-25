import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;

const turso = createClient({
  url: TURSO_DATABASE_URL!,
  authToken: TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso, { schema });
