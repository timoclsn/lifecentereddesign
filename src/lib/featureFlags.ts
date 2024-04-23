import { getAll } from '@vercel/edge-config';
import { cache } from 'react';
import { z } from 'zod';

const { NEXT_PUBLIC_VERCEL_ENV, NODE_ENV } = process.env;

const projectKey = 'lcdNet';
const ENV = NEXT_PUBLIC_VERCEL_ENV || NODE_ENV;

const flagsSchema = z.object({
  lcdNet: z.object({
    production: z.object({
      collections: z.boolean(),
    }),
    preview: z.object({
      collections: z.boolean(),
    }),
    development: z.object({
      collections: z.boolean(),
    }),
  }),
});

export const featureFlags = cache(async () => {
  const flags = await getAll();
  const parsedFlags = flagsSchema.parse(flags);
  const env = ENV === 'test' ? 'development' : ENV;
  return parsedFlags[projectKey][env];
});
