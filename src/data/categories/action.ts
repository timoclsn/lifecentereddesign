'use server';

import { category } from '@/db/schema';
import { z } from 'zod';
import { createAction } from '../clients';
import { revalidateTag } from '../tags';
import { selectCategories } from './categories';
import { ActionError } from '@/lib/data/errors';

export const getCategories = createAction({
  action: async () => {
    return await selectCategories();
  },
});

export const addCategory = createAction({
  input: z.object({
    name: z.string(),
  }),
  action: async ({ input, ctx }) => {
    const { name } = input;
    const { db } = ctx;

    await db
      .insert(category)
      .values({
        name,
      })
      .catch((error) => {
        throw new ActionError({
          message: 'Error adding category',
          cause: error,
        });
      });

    revalidateTag('categories');
  },
});
