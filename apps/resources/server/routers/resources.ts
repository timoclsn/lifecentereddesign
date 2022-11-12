import { prisma } from 'lib/prisma';
import { publicProcedure, router } from 'server/trpc';
import { z } from 'zod';

export const resourcesRouter = router({
  likes: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const data = await prisma.resourceMeta.findUnique({
        where: {
          id: input.id,
        },
      });
      return data;
    }),
  likeResource: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const data = await prisma.resourceMeta.upsert({
        where: {
          id: input.id,
        },
        update: {
          likes: {
            increment: 1,
          },
        },
        create: {
          id: input.id,
          likes: 1,
        },
      });
      return data;
    }),
});
