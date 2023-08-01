import { format } from 'date-fns';

export const getHostname = (url: string) => {
  const urlPartsRegEx =
    /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
  const urlParts = url.match(urlPartsRegEx);
  return urlParts?.at(4) ?? '';
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const minDelay = async <T>(promise: Promise<T>, ms: number) =>
  (await Promise.all([promise, wait(ms)]))[0];

export const formateDate = (date: Date | string) =>
  format(new Date(date), 'L/d/yyyy');

export const getBaseUrl = () => {
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};
