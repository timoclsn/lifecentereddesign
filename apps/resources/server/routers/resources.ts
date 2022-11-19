import { getAllResources, likeResource } from 'lib/content';
import { publicProcedure, router } from 'server/trpc';
import { z } from 'zod';

export const resourcesRouter = router({
  get: publicProcedure
    .input(
      z
        .object({
          from: z.date().optional(),
          till: z.date().optional(),
        })
        .optional()
    )
    .query(({ input }) => {
      return getAllResources({ from: input?.from, till: input?.till });
    }),
  like: publicProcedure
    .input(
      z.object({
        id: z.number(),
        type: z.enum([
          'THOUGHTLEADER',
          'ARTICLE',
          'BOOK',
          'PODCAST',
          'PODCASTEPISODE',
          'DIRECTORY',
          'VIDEO',
          'TOOL',
          'COMMUNITY',
          'COURSE',
          'EXAMPLE',
          'AGENCY',
          'SLIDE',
          'MAGAZINE',
          'NEWSLETTER',
        ]),
      })
    )
    .mutation(({ input }) => {
      return likeResource(input.id, input.type);
    }),
});
