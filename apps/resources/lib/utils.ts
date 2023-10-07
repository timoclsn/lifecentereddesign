/* eslint-disable turbo/no-undeclared-env-vars */

import { format } from 'date-fns';
import { ContentType } from './resources';

export const getHostname = (url: string) => {
  const urlPartsRegEx =
    /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
  const urlParts = url.match(urlPartsRegEx);
  return urlParts?.at(4) ?? '';
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const minDelay = async <T>(promise: Promise<T>, ms: number) =>
  (await Promise.all([promise, wait(ms)])).at(0);

export const formateDate = (date: Date | string) =>
  format(new Date(date), 'L/d/yyyy');

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production')
    return `https://lifecentereddesign.net`;
  if (process.env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const formatType = (type: string) => {
  const uppercaseFirstLetterType = type.charAt(0).toUpperCase() + type.slice(1);
  const typeWithSpaces = uppercaseFirstLetterType.replace(/([A-Z])/g, ' $1');
  return typeWithSpaces;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  } else if (typeof error === 'string') {
    return error;
  } else {
    return 'Something went wrong';
  }
};

export const isNextRedirectError = (message: string) =>
  message === 'NEXT_REDIRECT';

export const isNextNotFoundError = (message: string) =>
  message === 'NEXT_NOT_FOUND';

export const parseResourceSlug = (slug: string) => {
  const [resourceType, resourceId] = slug.split('-');
  return {
    resourceId: parseInt(resourceId),
    resourceType: resourceType as ContentType,
  };
};

export const isExternalUrl = (url: string) => {
  return url.startsWith('http');
};
