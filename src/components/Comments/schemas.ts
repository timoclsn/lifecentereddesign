import { z } from 'zod';

export const textSchema = z
  .string()
  .min(3, { message: 'Your comment has to be at least 3 characters.' })
  .max(300, { message: 'Your comment cannot be longer than 300 characters.' });
