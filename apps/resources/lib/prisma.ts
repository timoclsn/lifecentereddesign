/* eslint-disable turbo/no-undeclared-env-vars */
import { connect } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from 'database';
import { z } from 'zod';

const env = z.string().parse(process.env.NODE_ENV);
const databaseUrl = z.string().parse(process.env.DATABASE_URL);

const connection = connect({
  url: databaseUrl,
});
const adapter = new PrismaPlanetScale(connection);

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient =
  prismaGlobal.prisma || new PrismaClient({ adapter });

if (env !== 'production') {
  prismaGlobal.prisma = prisma;
}
