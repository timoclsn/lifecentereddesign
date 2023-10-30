import {
  formatType,
  formateDate,
  getBaseUrl,
  getErrorMessage,
  getHostname,
  isExternalUrl,
  isNextNotFoundError,
  isNextRedirectError,
  minDelay,
  parseResourceSlug,
  wait,
} from './utils';

describe('getHostname', () => {
  it('should return the hostname of a valid URL', () => {
    const url =
      'https://www.example.com/path/to/resource?query=string#fragment';
    const hostname = getHostname(url);
    expect(hostname).toBe('www.example.com');
  });

  it('should return an empty string for an invalid URL', () => {
    const url = 'not a valid URL';
    const hostname = getHostname(url);
    expect(hostname).toBe('');
  });

  it('should return an empty string for an empty string input', () => {
    const url = '';
    const hostname = getHostname(url);
    expect(hostname).toBe('');
  });
});

describe('wait', () => {
  it('should resolve after the specified number of milliseconds', async () => {
    const start = Date.now();
    await wait(1000);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
  });
});

describe('minDelay', () => {
  it('should resolve with the value of the promise', async () => {
    const promise = Promise.resolve('hello');
    const result = await minDelay(promise, 1000);
    expect(result).toBe('hello');
  });

  it('should wait for the specified number of milliseconds', async () => {
    const promise = Promise.resolve('world');
    const start = Date.now();
    await minDelay(promise, 1000);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
  });

  it('should reject if the promise rejects', async () => {
    const promise = Promise.reject(new Error('oops'));
    await expect(minDelay(promise, 1000)).rejects.toThrow('oops');
  });
});

describe('formateDate', () => {
  it('should format a date object correctly', () => {
    const date = new Date('2022-01-01T00:00:00.000Z');
    const formattedDate = formateDate(date);
    expect(formattedDate).toBe('1/1/2022');
  });

  it('should format a date string correctly', () => {
    const dateString = '2022-01-01T00:00:00.000Z';
    const formattedDate = formateDate(dateString);
    expect(formattedDate).toBe('1/1/2022');
  });

  it('should throw an error if the input is not a valid date', () => {
    const invalidDate = 'not a date';
    expect(() => formateDate(invalidDate)).toThrowError('Invalid time value');
  });
});

describe('getBaseUrl', () => {
  it('should return the production URL if NEXT_PUBLIC_VERCEL_ENV is "production"', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'production';
    const baseUrl = getBaseUrl();
    expect(baseUrl).toBe('https://lifecentereddesign.net');
  });

  it('should return the Vercel URL if NEXT_PUBLIC_VERCEL_URL is set', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = '';
    process.env.NEXT_PUBLIC_VERCEL_URL = 'example.vercel.app';
    const baseUrl = getBaseUrl();
    expect(baseUrl).toBe('https://example.vercel.app');
  });

  it('should return the localhost URL if neither NEXT_PUBLIC_VERCEL_ENV nor NEXT_PUBLIC_VERCEL_URL is set', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = '';
    process.env.NEXT_PUBLIC_VERCEL_URL = '';
    process.env.PORT = '3000';
    const baseUrl = getBaseUrl();
    expect(baseUrl).toBe('http://localhost:3000');
  });
});

describe('formatType', () => {
  it('should format a single word correctly', () => {
    const type = 'podcast';
    const formattedType = formatType(type);
    expect(formattedType).toBe('Podcast');
  });

  it('should format a camel case word correctly', () => {
    const type = 'podcastEpisode';
    const formattedType = formatType(type);
    expect(formattedType).toBe('Podcast Episode');
  });
});

describe('getErrorMessage', () => {
  it('should return the error message if the input is an Error object', () => {
    const error = new Error('Something went wrong');
    const errorMessage = getErrorMessage(error);
    expect(errorMessage).toBe('Something went wrong');
  });

  it('should return the message property of the input object if it exists', () => {
    const error = { message: 'Something went wrong' };
    const errorMessage = getErrorMessage(error);
    expect(errorMessage).toBe('Something went wrong');
  });

  it('should return the input string if it is a string', () => {
    const error = 'Something went wrong';
    const errorMessage = getErrorMessage(error);
    expect(errorMessage).toBe('Something went wrong');
  });

  it('should return "Something went wrong" if the input is not an Error object, object with message property, or string', () => {
    const error = null;
    const errorMessage = getErrorMessage(error);
    expect(errorMessage).toBe('Something went wrong');
  });
});

describe('isNextRedirectError', () => {
  it('should return true if the input is "NEXT_REDIRECT"', () => {
    const message = 'NEXT_REDIRECT';
    const result = isNextRedirectError(message);
    expect(result).toBe(true);
  });

  it('should return false if the input is not "NEXT_REDIRECT"', () => {
    const message = 'SOME_OTHER_ERROR';
    const result = isNextRedirectError(message);
    expect(result).toBe(false);
  });
});

describe('isNextNotFoundError', () => {
  it('should return true if the input is "NEXT_NOT_FOUND"', () => {
    const message = 'NEXT_NOT_FOUND';
    const result = isNextNotFoundError(message);
    expect(result).toBe(true);
  });

  it('should return false if the input is not "NEXT_NOT_FOUND"', () => {
    const message = 'SOME_OTHER_ERROR';
    const result = isNextNotFoundError(message);
    expect(result).toBe(false);
  });
});

describe('parseResourceSlug', () => {
  it('should parse a valid slug correctly', () => {
    const slug = 'article-123';
    const result = parseResourceSlug(slug);
    expect(result).toEqual({ resourceId: 123, resourceType: 'article' });
  });
});

describe('isExternalUrl', () => {
  it('should return true for an external URL starting with "http"', () => {
    const url = 'http://www.google.com';
    const result = isExternalUrl(url);
    expect(result).toBe(true);
  });

  it('should return true for an external URL starting with "https"', () => {
    const url = 'https://www.google.com';
    const result = isExternalUrl(url);
    expect(result).toBe(true);
  });

  it('should return false for an internal URL', () => {
    const url = '/about';
    const result = isExternalUrl(url);
    expect(result).toBe(false);
  });

  it('should return false for an empty string', () => {
    const url = '';
    const result = isExternalUrl(url);
    expect(result).toBe(false);
  });
});
