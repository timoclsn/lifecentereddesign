'use server';

import { category } from '@/db/schema';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { createAction } from '../clients';
import { cacheTags } from '../tags';
import { selectCategories } from './categories';

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

    await db.insert(category).values({
      name,
    });

    revalidateTag(cacheTags.categories);
  },
});
