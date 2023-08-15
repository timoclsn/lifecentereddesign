'use server';

import { auth } from '@clerk/nextjs';
import { createAction } from 'lib/actions/createAction';
import { addResourceComment, resourceTypes } from 'lib/resources';
import { z } from 'zod';

export const add = createAction(
  z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
    text: z.string().min(3, 'Too short').max(256, 'Too long'),
  }),
)(async ({ id, type, text }) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await addResourceComment(userId, id, type, text);
});
