import { createQuery } from '@/data/clients';
import { z } from 'zod';
import { cacheTags } from '../tags';

const { NODE_ENV } = process.env;

const wccSchema = z.object({
  url: z.string().url(),
  green: z.union([z.boolean(), z.string()]),
  bytes: z.number(),
  cleanerThan: z.number(),
  statistics: z.object({
    adjustedBytes: z.number(),
    energy: z.number(),
    co2: z.object({
      grid: z.object({
        grams: z.number(),
        litres: z.number(),
      }),
      renewable: z.object({
        grams: z.number(),
        litres: z.number(),
      }),
    }),
  }),
  timestamp: z.number(),
});

export const getConsumtion = createQuery({
  input: z.object({
    url: z.string().url(),
  }),
  cache: {
    keyParts: [cacheTags.co2],
    options: {
      revalidate: 3600,
      tags: [cacheTags.co2],
    },
  },
  query: async ({ input }) => {
    const { url } = input;

    if (NODE_ENV === 'development') {
      return {
        co2: 0.14,
        cleanerThan: 86,
      };
    }

    const response = await fetch(
      `https://api.websitecarbon.com/site?url=${url}`,
    );
    const result = await response.json();
    const parsedResult = wccSchema.parse(result);

    const co2 = Math.round(parsedResult.statistics.co2.grid.grams * 100) / 100;
    const cleanerThan = Math.round(parsedResult.cleanerThan * 100);

    return {
      co2,
      cleanerThan,
    };
  },
});
