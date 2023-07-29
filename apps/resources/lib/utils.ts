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
  format(new Date(date), 'LL/dd/yyyy');
