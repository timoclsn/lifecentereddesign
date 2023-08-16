'use server';

import { auth } from '@clerk/nextjs';
import { createAction } from 'lib/actions/createAction';
import {
  addResourceComment,
  resourceComemntsTag,
  resourceTypes,
} from 'lib/resources';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { textSchema } from './schemas';

export const add = createAction(
  z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
    text: textSchema,
  }),
)(async ({ id, type, text }) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await addResourceComment(userId, id, type, text);

  const tag = resourceComemntsTag(id, type);
  revalidateTag(tag);
});
