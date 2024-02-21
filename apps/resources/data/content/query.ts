import { createQuery } from 'data/clients';
import { getContent } from 'lib/content';
import 'server-only';
import { z } from 'zod';

export const getPage = createQuery({
  input: z.enum(['imprint', 'privacy', 'about']),
  query: async ({ input }) => {
    return await getContent('page', input);
  },
});
