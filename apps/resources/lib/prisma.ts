import { PrismaClient } from 'database';
import { z } from 'zod';

// eslint-disable-next-line turbo/no-undeclared-env-vars
const env = z.string().parse(process.env.NODE_ENV);

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient = prismaGlobal.prisma || new PrismaClient();

if (env !== 'production') {
  prismaGlobal.prisma = prisma;
}
