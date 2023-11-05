import { z } from 'zod';

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

export const getCO2Consumtion = async (url: string) => {
  const response = await fetch(
    `https://api.websitecarbon.com/site?url=${url}`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  const result = await response.json();

  const parsedResult = wccSchema.parse(result);

  const co2 = Math.round(parsedResult.statistics.co2.grid.grams * 100) / 100;
  const cleanerThan = Math.round(parsedResult.cleanerThan * 100);

  return {
    co2,
    cleanerThan,
  };
};
