'use server';

import { topic } from '@/db/schema';
import { z } from 'zod';
import { createAction, createAdminAction } from '../clients';
import { revalidateTag } from '../tags';
import { selectTopics } from './topics';
import { ServerActionError } from '@/lib/data/errors';

export const getTopics = createAction({
  action: async () => {
    return await selectTopics();
  },
});

export const addTopic = createAdminAction({
  input: z.object({
    name: z.string(),
  }),
  action: async ({ input, ctx }) => {
    const { name } = input;
    const { db } = ctx;

    await db
      .insert(topic)
      .values({
        name,
      })
      .catch((error) => {
        throw new ServerActionError({
          message: 'Error adding topic',
          cause: error,
        });
      });

    revalidateTag('topics');
  },
});
