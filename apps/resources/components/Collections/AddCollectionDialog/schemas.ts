import { z } from 'zod';

export type AddCollectionSchema = z.infer<typeof addCollectionSchema>;

export const addCollectionSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'The collection title has to be 3 characters minimum.' })
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
});
