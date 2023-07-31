import { PrismaClient } from 'database';
import { z } from 'zod';

// eslint-disable-next-line turbo/no-undeclared-env-vars
const env = z.string().parse(process.env.NODE_ENV);
// eslint-disable-next-line turbo/no-undeclared-env-vars
const DATABASE_URL = z.string().parse(process.env.DATABASE_URL);

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient =
  prismaGlobal.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  });

if (env !== 'production') {
  prismaGlobal.prisma = prisma;
}
