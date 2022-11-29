import { getResourceLikes, getResources, likeResource, resourceTypes } from 'lib/resources';
import { publicProcedure, router } from 'server/trpc';
import { z } from 'zod';

const typeSchema = z.enum(resourceTypes);

export const resourcesRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          from: z.date().optional(),
          till: z.date().optional(),
          limit: z.number().min(0).optional(),
          sort: z.enum(['date', 'title', 'likes']).optional(),
        })
        .optional()
    )
    .query(({ input }) => {
      return getResources({
        from: input?.from,
        till: input?.till,
        sort: input?.sort,
        limit: input?.limit,
      });
    }),
  like: publicProcedure
    .input(
      z.object({
        id: z.number(),
        type: typeSchema,
      })
    )
    .mutation(({ input }) => {
      const { id, type } = input;
      return likeResource(id, type);
    }),
  likes: publicProcedure
    .input(
      z.object({
        id: z.number(),
        type: typeSchema,
      })
    )
    .query(({ input }) => {
      const { id, type } = input;
      return getResourceLikes(id, type);
    }),
});
