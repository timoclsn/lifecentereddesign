import { z } from 'zod';
import { getErrorMessage } from '../utils';

declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & { [brand]: TBrand };

type ServerAction<TInput extends z.ZodTypeAny, TResponse extends any> = (
  input?: z.input<TInput>,
) => Promise<{
  data: TResponse | null;
  error: string | null;
}>;

export type BrandedServerAction<
  TInput extends z.ZodTypeAny,
  TResponse extends any,
> = Brand<ServerAction<TInput, TResponse>, 'ServerAction'>;

export const createAction = <TInputSchema extends z.ZodTypeAny>(
  inputSchema?: TInputSchema,
) => {
  // Second function accepts the action
  return <TInput extends z.ZodTypeAny, TResponse extends any>(
    action: (
      input?: z.input<TInput>,
    ) => void | TResponse | Promise<void | TResponse>,
  ) => {
    // The actual returned serven action
    const serverAction: ServerAction<TInputSchema, TResponse> = async (
      input?: z.input<TInputSchema>,
    ) => {
      let parsedInput = input;

      if (inputSchema) {
        const result = inputSchema.safeParse(input);
        if (!result.success) {
          return {
            data: null,
            error: result.error.message,
          };
        }
        parsedInput = result.data;
      }

      try {
        const response = await action(input);
        return {
          data: response ?? null,
          error: null,
        };
      } catch (error) {
        return {
          data: null,
          error: getErrorMessage(error),
        };
      }
    };

    return serverAction as BrandedServerAction<TInputSchema, TResponse>;
  };
};
