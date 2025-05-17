import { ActionError } from '@/lib/data/errors';
import { createActionClient, createQueryClient } from '@/lib/data/server';
import { db } from '@/lib/db';
import { isAdmin } from '@/lib/users';
import { auth } from '@clerk/nextjs/server';

// Actions
export const createAction = createActionClient({
  middleware: async () => {
    const { userId } = await auth();
    return { db, userId };
  },
  onError: (error) => {
    console.error('🚨 Action error:', error);
  },
});

export const createProtectedAction = createActionClient({
  middleware: async () => {
    const { userId } = await auth();

    if (!userId) {
      throw new ActionError({
        message: 'You must be logged in to perform this action.',
      });
    }

    return { db, userId };
  },
  onError: (error) => {
    console.error('🚨 Action Error:', error);
  },
});

export const createAdminAction = createActionClient({
  middleware: async () => {
    const { userId } = await auth();

    if (!userId) {
      throw new ActionError({
        message: 'You must be logged in to perform this action.',
      });
    }

    const admin = await isAdmin(userId);

    if (!admin) {
      throw new ActionError({
        message: 'You must be an admin to perform this action.',
      });
    }

    return { db, userId };
  },
  onError: (error) => {
    console.error('🚨 Action Error:', error);
  },
});

// Queries
export const createQuery = createQueryClient({
  middleware: async () => {
    const { userId } = await auth();
    return { db, userId };
  },
  onError: (error) => {
    console.error('🚨 Query error:', error);
  },
});

export const createProtectedQuery = createQueryClient({
  middleware: async () => {
    const { userId } = await auth();

    if (!userId) {
      throw new Error('You must be logged in to perform this query.');
    }

    return { db, userId };
  },
  onError: (error) => {
    console.error('🚨 Query error:', error);
  },
});

export const createAdminQuery = createQueryClient({
  middleware: async () => {
    const { userId } = await auth();

    if (!userId) {
      throw new Error('You must be logged in to perform this query.');
    }

    const admin = await isAdmin(userId);

    if (!admin) {
      throw new Error('You must be an admin to perform this qzery.');
    }

    return { db, userId };
  },
  onError: (error) => {
    console.error('🚨 Query Error:', error);
  },
});
