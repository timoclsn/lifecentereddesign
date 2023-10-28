'use server';

import { createCollection } from 'lib/collections';
import { createProtectedAction } from 'lib/serverActions/create';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { addCollectionSchema } from './schemas';

export const addCollection = createProtectedAction({
  input: addCollectionSchema.merge(
    z.object({
      goToCollection: z.boolean().optional(),
    }),
  ),
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
