'use server';

import { z } from 'zod';
import { createAction } from '../clients';
import { type } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export const getTypes = createAction({
  action: async ({ ctx }) => {
    const { db } = ctx;

    return await db.query.type.findMany({
      orderBy: (model, { asc }) => asc(model.name),
    });
  },
});

export const addType = createAction({
  input: z.object({
    name: z.string(),
  }),
  action: async ({ input, ctx }) => {
    const { name } = input;
    const { db } = ctx;

    await db.insert(type).values({
      name,
    });

    revalidatePath('/');
  },
});
