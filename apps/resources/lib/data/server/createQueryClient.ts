import {
  unstable_cache as nextCache,
  unstable_noStore as noStore,
} from 'next/cache';
import { cache as reactCache } from 'react';
import { z } from 'zod';
import {
  CacheOptions,
  CreateClientOptions,
  MaybePromise,
  ServerQuery,
} from '../types';

export const createQueryClient = <Context>(
  createClientOpts?: CreateClientOptions<Context>,
) => {
  const createQuery = <
    TInputSchema extends z.ZodTypeAny,
    TResponse extends any,
  >(queryBuilderOpts: {
    input?: TInputSchema;
    query: (queryArgs: {
      input: z.output<TInputSchema>;
      ctx: Context;
    }) => MaybePromise<TResponse>;
    cache?:
      | CacheOptions
      | ((queryArgs: {
          input: z.output<TInputSchema>;
          ctx: Context;
        }) => CacheOptions);
  }) => {
    let cacheOptions: CacheOptions | undefined;

    const query: ServerQuery<TInputSchema, TResponse> = async (
      ...inputArgs
    ) => {
      const [input] = inputArgs;

      // Validate input if schema is provided
      let parsedInput = input;
      if (queryBuilderOpts.input) {
        parsedInput = queryBuilderOpts.input.parse(input);
      }

      // Run middleware if provided and get context
      const ctx = (await createClientOpts?.middleware?.()) ?? ({} as Context);

      cacheOptions =
        typeof queryBuilderOpts.cache === 'function'
          ? queryBuilderOpts.cache({ input: parsedInput, ctx })
          : queryBuilderOpts.cache;

      if (cacheOptions?.noStore) {
        noStore();
      }

      // Call query

      // Populate data in next data cache if cache options are provided
      if (cacheOptions?.keyParts || cacheOptions?.options) {
        return nextCache(
          async () => {
            return await queryBuilderOpts.query({
              input: parsedInput,
              ctx,
            });
          },
          cacheOptions.keyParts,
          cacheOptions.options,
        )();
      } else {
        return await queryBuilderOpts.query({
          input: parsedInput,
          ctx,
        });
      }
    };

    return reactCache(query);
  };

  return createQuery;
};
