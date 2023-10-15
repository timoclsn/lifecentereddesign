import { getAll } from '@vercel/edge-config';
import { z } from 'zod';

const projectKey = 'lcdNet';
const nodeEnv = z
  .enum(['development', 'production'])
  .parse(process.env.NODE_ENV);
const vercelEnv = z
  .enum(['development', 'preview', 'production'])
  .optional()
  .parse(process.env.VERCEL_ENV);

const env = vercelEnv || nodeEnv;

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

export const featureFlags = async () => {
  const flags = await getAll();
  const parsedFlags = flagsSchema.parse(flags);
  return parsedFlags[projectKey][env];
};
