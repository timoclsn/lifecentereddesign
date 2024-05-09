import { createClient } from '@libsql/client';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import * as schema from './schema';

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;

const main = async () => {
  console.log('Starting migrations');

  const turso = createClient({
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  });

  const db = drizzle(turso, { schema });

  console.log('Running migrations');

  await migrate(db, { migrationsFolder: './src/db/migrations' });

  console.log('Migrated successfully');

  process.exit(0);
};

main().catch((e) => {
  console.error('Migration failed');
  console.error(e);
  process.exit(1);
});
