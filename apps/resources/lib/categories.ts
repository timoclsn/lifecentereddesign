import { Prisma } from 'database';

export type Category = Prisma.CategoryGetPayload<{}>;
export type Categories = Array<Category>;
