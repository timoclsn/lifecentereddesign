import { router } from '../trpc';
import { newsletterRouter } from './newsletter';
import { resourcesRouter } from './resources';

export const appRouter = router({
  resources: resourcesRouter,
  newsletter: newsletterRouter,
});

export type AppRouter = typeof appRouter;
