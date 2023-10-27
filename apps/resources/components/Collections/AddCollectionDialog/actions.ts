'use server';

import { createProtectedAction } from 'lib/serverActions/create';
import { createCollection } from 'lib/collections';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const addCollection = createProtectedAction({
  input: z.object({
    title: z
      .string()
      .min(3, {
        message: 'The collection title has to be 3 characters minimum.',
      })
      .max(50, {
        message: 'The collection title cannot be longer than 50 characters.',
      }),
    description: z
      .string()
      .min(3, {
        message: 'The collection description has to be 3 characters minimum.',
      })
      .max(300, {
        message:
          'The collection description cannot be longer than 300 characters.',
      }),
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
