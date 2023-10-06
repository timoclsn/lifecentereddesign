import { auth } from '@clerk/nextjs';
import { createActionClient } from './server';

export const createAction = createActionClient();

export const createProtectedAction = createActionClient({
  middleware: () => {
    const { userId } = auth();

    if (!userId) {
      throw new Error('You must be logged in to perform this action.');
    }

    return {
      userId,
    };
  },
});
