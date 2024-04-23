import { db } from '@/lib/db';
import { isAdmin } from '@/lib/users';
import { auth } from '@clerk/nextjs/server';
import { createActionClient, createQueryClient } from '../lib/data/server';

export const createAction = createActionClient({
  middleware: () => {
    const { userId } = auth();

    return { db, userId };
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

export const createAdminAction = createActionClient({
  middleware: async () => {
    const { userId } = auth();

    if (!userId) {
      throw new Error('You must be logged in to perform this action.');
    }

    const admin = await isAdmin(userId);

    if (!admin) {
      throw new Error('You must be an admin to perform this action.');
    }

    return { db, userId };
  },
});

export const createQuery = createQueryClient({
  middleware: () => {
    const { userId } = auth();

    return { db, userId };
  },
});

export const createProtectedQuery = createQueryClient({
  middleware: () => {
    const { userId } = auth();

    if (!userId) {
      throw new Error('You must be logged in to perform this query.');
    }

    return { db, userId };
  },
});
