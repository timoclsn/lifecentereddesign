import { createClient } from '@libsql/client';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { writeFileSync } from 'fs';
import * as schema from './schema';

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;

const main = async () => {
  console.info('Execute SQL...');

  const turso = createClient({
    url: 'file:local.db',
    // url: TURSO_DATABASE_URL!,
    // authToken: TURSO_AUTH_TOKEN,
  });

  const db = drizzle(turso, { schema });

  const resources = await db.query.resource.findMany({
    columns: {
      id: true,
      oldSlug: true,
    },
  });

  const redirects = resources.map(({ id, oldSlug }) => ({
    source: `/resources/${oldSlug}`,
    destination: `/resources/${id}`,
    permanent: true,
  }));

  writeFileSync('redirects.json', JSON.stringify(redirects, null, 2));

  console.info('Executing SQL complete.');
};

main();
