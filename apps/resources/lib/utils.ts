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
  if (process.env.URL) return process.env.URL;
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const formatType = (type: string) => {
  const uppercaseFirstLetterType = type.charAt(0).toUpperCase() + type.slice(1);
  const typeWithSpaces = uppercaseFirstLetterType.replace(/([A-Z])/g, ' $1');
  return typeWithSpaces;
};
