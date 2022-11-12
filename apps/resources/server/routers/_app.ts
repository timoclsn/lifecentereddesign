import { router } from '../trpc';
import { resourcesRouter } from './resources';

export const appRouter = router({
  resources: resourcesRouter,
});

export type AppRouter = typeof appRouter;
