import { createTRPCNext } from '@trpc/next';
import { httpBatchLink } from '@trpc/react-query';
import superjson from 'superjson';
import type { AppRouter } from '../server/routers/_app';

export const trpc = createTRPCNext<AppRouter>({
  config: () => {
    return {
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
      transformer: superjson,
    };
  },
});
