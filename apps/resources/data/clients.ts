import { auth } from '@clerk/nextjs/server';
import { db } from 'lib/db';
import { createActionClient, createQueryClient } from '../lib/data/server';

export const createAction = createActionClient({
  middleware: () => {
    return { db };
  },
});

export const createProtectedAction = createActionClient({
  middleware: () => {
    const { userId } = auth();

    if (!userId) {
      throw new Error('You must be logged in to perform this action.');
    }
    return { db, userId };
  },
});

export const createQuery = createQueryClient({
  middleware: () => {
    return { db };
  },
});
