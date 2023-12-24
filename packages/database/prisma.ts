import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const env = z.string().parse(process.env.NODE_ENV);

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient = prismaGlobal.prisma || new PrismaClient();

if (env !== 'production') {
  prismaGlobal.prisma = prisma;
}
