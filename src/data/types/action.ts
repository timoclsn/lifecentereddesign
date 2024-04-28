'use server';

import { type } from '@/db/schema';
import { z } from 'zod';
import { createAction, createAdminAction } from '../clients';
import { revalidateTag } from '../tags';
import { selectTypes } from './types';
import { ActionError } from '@/lib/data/errors';

export const getTypes = createAction({
  action: async () => {
    return await selectTypes();
  },
});

export const addType = createAdminAction({
  input: z.object({
    name: z.string(),
  }),
  action: async ({ input, ctx }) => {
    const { name } = input;
    const { db } = ctx;

    await db
      .insert(type)
      .values({
        name,
      })
      .catch((error) => {
        throw new ActionError({
          message: 'Error adding type',
          cause: error,
        });
      });

    revalidateTag('types');
  },
});
