import { format } from 'date-fns';
import { z } from 'zod';
import { cx } from 'cva';

const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;
const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
const PORT = process.env.PORT;

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
  if (NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return `https://lifecentereddesign.net`;
  }
  if (NEXT_PUBLIC_VERCEL_URL) {
    return `https://${NEXT_PUBLIC_VERCEL_URL}`;
  }
  return `http://localhost:${PORT ?? 3000}`;
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

/**
 * Converts a given text into a slug format.
 * @param text - The text to be converted into a slug.
 * @returns The slugified version of the input text.
 */
export const sluggify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

/**
 * Checks if an object is empty.
 * @param obj - The object to check.
 * @returns `true` if the object is empty, `false` otherwise.
 */
export const isEmpty = (obj: Record<string, unknown>) => {
  for (let key in obj) {
    if (obj[key] !== undefined) {
      return false;
    }
  }
  return true;
};

/**
 * A utility function that assigns class names to an element based on the provided conditions.
 * This function is an alias for the `cx` function.
 *
 * @param classNames - The class names to be assigned.
 * @returns The assigned class names.
 */
export const cn = cx;
