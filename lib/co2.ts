import { fetcher } from './fetcher';

const env = process.env.NODE_ENV;

const demoResult = {
  co2: 0.11,
  cleanerThan: 90,
};

export type CO2 = typeof demoResult;

export async function getCO2Consumtion(url: string) {
  if (env === 'development') {
    return demoResult;
  }

  const result = await fetcher(`https://api.websitecarbon.com/site?url=${url}`);

  if (result.error || Object.keys(result).length === 0) {
    console.log(`Website Carbon Error: ${result.error}`);
    return demoResult;
  }

  return {
    co2: Math.round(result.statistics.co2.grid.grams * 100) / 100,
    cleanerThan: Math.round(result.cleanerThan * 100),
  };
}
