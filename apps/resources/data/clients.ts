import { auth } from '@clerk/nextjs';
import { prisma } from 'database';
import { createActionClient, createQueryClient } from '../lib/data/server';

export const createAction = createActionClient({
  middleware: () => {
    return { db: prisma };
  },
});

export const createProtectedAction = createActionClient({
  middleware: () => {
    const { userId } = auth();

    if (!userId) {
      throw new Error('You must be logged in to perform this action.');
    }
    return { db: prisma, userId };
  },
});

export const createQuery = createQueryClient({
  middleware: () => {
    return { db: prisma };
  },
});

export const createProtectedQuery = createQueryClient({
  middleware: () => {
    const { userId } = auth();

    if (!userId) {
      throw new Error('You must be logged in to perform this action.');
    }

    return { db: prisma, userId };
  },
});
