import { z } from 'zod';
import { fetcher } from './fetcher';

const env = z.string().parse(process.env.NODE_ENV);

const demoResult = {
  co2: 0.11,
  cleanerThan: 96,
};

export type CO2 = typeof demoResult;

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

export async function getCO2Consumtion(url: string) {
  if (env === 'development') {
    return demoResult;
  }

  const result = await fetcher(`https://api.websitecarbon.com/site?url=${url}`);
  const parsedResult = wccSchema.safeParse(result);

  if (!parsedResult.success) {
    console.log(parsedResult.error);
    return demoResult;
  }

  const co2 =
    Math.round(parsedResult.data.statistics.co2.grid.grams * 100) / 100;
  const cleanerThan = Math.round(parsedResult.data.cleanerThan * 100);

  return {
    co2,
    cleanerThan,
  };
}
