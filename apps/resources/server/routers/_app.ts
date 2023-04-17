import { router } from '../trpc';
import { newsletterRouter } from './newsletter';
import { resourcesRouter } from './resources';
import { suggestionRouter } from './suggestion';
import { userRouter } from './user';

export const appRouter = router({
  resources: resourcesRouter,
  newsletter: newsletterRouter,
  suggestion: suggestionRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
