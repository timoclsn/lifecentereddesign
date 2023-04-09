import {
  getLikedResources,
  getResourceNewLikes,
  getResourceOldLikesCount,
  getResources,
  likeResource,
  resourceTypes,
  unlikeResource,
} from 'lib/resources';
import { protectedProcedure, publicProcedure, router } from 'server/trpc';
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
  like: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        type: typeSchema,
      })
    )
    .mutation(({ input, ctx }) => {
      const { id, type } = input;
      const { userId } = ctx.auth;

      likeResource(userId, id, type);
    }),
  unlike: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        type: typeSchema,
      })
    )
    .mutation(({ input, ctx }) => {
      const { id, type } = input;
      const { userId } = ctx.auth;

      unlikeResource(userId, id, type);
    }),
  likes: publicProcedure
    .input(
      z.object({
        id: z.number(),
        type: typeSchema,
      })
    )
    .query(async ({ input, ctx }) => {
      const { id, type } = input;
      const { userId } = ctx.auth;

      const [oldLikesCount, newLikes] = await Promise.all([
        getResourceOldLikesCount(id, type),
        getResourceNewLikes(id, type),
      ]);

      const newLikesCount = newLikes.length;

      return {
        count: oldLikesCount + newLikesCount,
        liked: newLikes.some((like) => like.userId === userId),
      };
    }),
  liked: protectedProcedure.query(({ ctx }) => {
    const { userId } = ctx.auth;
    return getLikedResources(userId);
  }),
});
