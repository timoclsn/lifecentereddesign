import { publicProcedure, router } from 'server/trpc';

export const resourcesRouter = router({
  test: publicProcedure.query(() => {
    return 'hello World';
  }),
});
