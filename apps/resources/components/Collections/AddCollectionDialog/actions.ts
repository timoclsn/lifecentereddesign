'use server';

import { createAction } from 'lib/actions/createAction';
import { createCollection } from 'lib/collections';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { addCollectionSchema } from './schemas';

export const addCollection = createAction({
  input: addCollectionSchema,
  action: async ({ input, ctx }) => {
    const { title, description } = input;
    const { userId } = ctx;

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const collection = await createCollection({
      userId,
      title,
      description,
    });

    revalidateTag('collections');
    redirect(`/collections/${collection.id}`);
  },
});
