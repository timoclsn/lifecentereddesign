import { format } from 'date-fns';
import { ContentType } from 'lib/resources';
import { z } from 'zod';

/**
 * Returns the hostname of a given URL.
 * @param url - The URL to extract the hostname from.
 * @returns The hostname of the given URL.
 */
export const getHostname = (url: string) => {
  const urlPartsRegEx =
    /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
  const urlParts = url.match(urlPartsRegEx);
  return urlParts?.at(4) ?? '';
};

/**
 * Wait for a specified amount of time.
 * @param ms - The number of milliseconds to wait.
 * @returns A promise that resolves after the specified time has elapsed.
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Waits for a given amount of time before resolving the promise.
 * @param ms - The amount of time to wait in milliseconds.
 * @returns A promise that resolves after the given amount of time has passed.
 */
export const minDelay = async <T>(promise: Promise<T>, ms: number) =>
  (await Promise.all([promise, wait(ms)])).at(0);

/**
 * Formats a date to a string in the format of "L/d/yyyy".
 * @param date - The date to be formatted.
 * @returns A string representation of the formatted date.
 */
export const formateDate = (date: Date | string) =>
  format(new Date(date), 'L/d/yyyy');

/**
 * Returns the base URL based on the environment.
 * @returns {string} The base URL.
 */
export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return `https://lifecentereddesign.net`;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

/**
 * Formats a string by adding spaces between words and capitalizing the first letter of each word.
 * @param type - The string to be formatted.
 * @returns The formatted string.
 */
export const formatType = (type: string) => {
  const words = type.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
  const formattedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return formattedWords.join(' ');
};

/**
 * Parses a resource slug into its corresponding resource type and ID.
 * @param slug - The resource slug to parse.
 * @returns An object containing the parsed resource ID and type.
 */
export const parseResourceSlug = (slug: string) => {
  const [resourceType, resourceId] = slug.split('-');
  return {
    resourceId: parseInt(resourceId),
    resourceType: resourceType as ContentType,
  };
};

/**
 * Checks if a given URL is an external URL.
 * @param url - The URL to check.
 * @returns True if the URL is external, false otherwise.
 */
export const isExternalUrl = (url: string) => {
  return url.startsWith('http');
};

/**
 * Checks if a given string is a valid URL.
 * @param url - The string to be checked.
 * @returns True if the string is a valid URL, false otherwise.
 */
export const isUrl = (url: string) => {
  const result = z.string().url().safeParse(url);
  return result.success;
};
