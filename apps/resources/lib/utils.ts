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
