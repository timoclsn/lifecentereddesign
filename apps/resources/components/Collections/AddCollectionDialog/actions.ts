'use server';

import { createProtectedAction } from 'lib/serverActions/create';
import { createCollection } from 'lib/collections';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { addCollectionSchema } from './schemas';

export const addCollection = createProtectedAction({
  input: addCollectionSchema,
  action: async ({ input, ctx }) => {
    const { title, description } = input;
    const { userId } = ctx;

    const collection = await createCollection({
      userId,
      title,
      description,
    });

    revalidateTag('collections');
    redirect(`/collections/${collection.id}`);
  },
});
