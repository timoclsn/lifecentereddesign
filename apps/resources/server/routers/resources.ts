import {
  anonymousLikeResource,
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
    .query(async ({ input }) => {
      return await getResources({
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
    .mutation(async ({ input, ctx }) => {
      const { id, type } = input;
      const { userId } = ctx.auth;

      if (userId) {
        await likeResource(userId, id, type);
      } else {
        await anonymousLikeResource(id, type);
      }
    }),
  unlike: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        type: typeSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, type } = input;
      const { userId } = ctx.auth;

      await unlikeResource(userId, id, type);
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
  liked: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx.auth;
    return await getLikedResources(userId);
  }),
});
