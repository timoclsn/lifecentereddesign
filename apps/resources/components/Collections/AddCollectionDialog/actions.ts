'use server';

import { createProtectedAction } from 'lib/serverActions/create';
import { createCollection } from 'lib/collections';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { addCollectionSchema } from './schemas';
import { z } from 'zod';

export const addCollection = createProtectedAction({
  input: addCollectionSchema.extend({
    goToCollection: z.boolean().optional(),
  }),
  action: async ({ input, ctx }) => {
    const { title, description, goToCollection } = input;
    const { userId } = ctx;

    const collection = await createCollection({
      userId,
      title,
      description,
    });

    revalidateTag('collections');

    if (goToCollection) {
      redirect(`/collections/${collection.id}`);
    }
  },
});
