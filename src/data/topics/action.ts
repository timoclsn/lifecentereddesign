'use server';

import { topic } from '@/db/schema';
import { z } from 'zod';
import { createAction, createAdminAction } from '../clients';
import { revalidateTag } from '../tags';
import { selectTopics } from './topics';

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

    await db.insert(topic).values({
      name,
    });

    revalidateTag('topics');
  },
});
