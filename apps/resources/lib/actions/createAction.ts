import { auth } from '@clerk/nextjs';
import { z } from 'zod';
import { getErrorMessage } from '../utils';

type ServerAction<
  TInputSchema extends z.ZodTypeAny,
  TInput extends TInputSchema | undefined,
  TResponse,
> = (
  input: z.ZodTypeAny extends TInput ? void : z.input<TInputSchema>,
) => Promise<{
  data: TResponse | null;
  error: string | null;
}>;

declare const brand: unique symbol;
type Brand<T, TBrand extends string> = T & { [brand]: TBrand };

export type BrandedServerAction<
  TInputSchema extends z.ZodTypeAny,
  TInput extends TInputSchema | undefined,
  TResponse extends any,
> = Brand<ServerAction<TInputSchema, TInput, TResponse>, 'ServerAction'>;

export const createAction = <
  TInputSchema extends z.ZodTypeAny,
  TInput extends TInputSchema | undefined,
  TResponse extends any,
>(opts: {
  input?: TInputSchema;
  action: (args: {
    input: z.input<TInputSchema>;
    ctx: { userId: string | null };
  }) => void | TResponse | Promise<void> | Promise<TResponse>;
}) => {
  const serverAction: ServerAction<TInputSchema, TInput, TResponse> = async (
    input,
  ) => {
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
      const { userId } = auth();
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

  return serverAction as BrandedServerAction<TInputSchema, TInput, TResponse>;
};
