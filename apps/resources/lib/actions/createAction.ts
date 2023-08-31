import { z } from 'zod';
import { getErrorMessage } from '../utils';
import { auth } from '@clerk/nextjs';

declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & { [brand]: TBrand };

type ServerAction<TInput extends z.ZodTypeAny, TResponse extends any> = (
  input: z.input<TInput>,
) => Promise<{
  data: TResponse | null;
  error: string | null;
}>;

export type BrandedServerAction<
  TInput extends z.ZodTypeAny,
  TResponse extends any,
> = Brand<ServerAction<TInput, TResponse>, 'ServerAction'>;

export const createAction = <
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
>(opts: {
  input?: TInputSchema;
  action: (args: {
    input: z.input<TInputSchema>;
    ctx: { userId: string | null };
  }) => void | TResponse | Promise<void> | Promise<TResponse>;
}) => {
  const serverAction: ServerAction<TInputSchema, TResponse> = async (input) => {
    const { userId } = auth();

    let parsedInput = input;
    if (opts.input) {
      const result = opts.input.safeParse(input);
      if (!result.success) {
        return {
          data: null,
          error: result.error.message,
        };
      }
      parsedInput = result.data;
    }

    try {
      const response = await opts.action({
        input: parsedInput,
        ctx: { userId },
      });
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
