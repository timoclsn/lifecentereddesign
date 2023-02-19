import { router } from '../trpc';
import { newsletterRouter } from './newsletter';
import { resourcesRouter } from './resources';
import { suggestionRouter } from './suggestion';

export const appRouter = router({
  resources: resourcesRouter,
  newsletter: newsletterRouter,
  suggestion: suggestionRouter,
});

export type AppRouter = typeof appRouter;
