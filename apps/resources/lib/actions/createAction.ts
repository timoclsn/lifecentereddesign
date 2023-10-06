import { auth } from '@clerk/nextjs';
import { z } from 'zod';
import { getErrorMessage } from '../utils';

export type InferInputType<
  TInputSchema extends z.ZodTypeAny,
  TInput extends TInputSchema | undefined,
> = z.ZodTypeAny extends TInput ? void : z.input<TInputSchema>;

interface Result<TResponse> {
  data: TResponse | null;
  error: string | null;
}

type ServerAction<
  TInputSchema extends z.ZodTypeAny,
  TInput extends TInputSchema | undefined,
  TResponse,
> = (input: InferInputType<TInputSchema, TInput>) => Promise<Result<TResponse>>;

declare const brand: unique symbol;
type Brand<T, TBrand extends string> = T & { [brand]: TBrand };

export type BrandedServerAction<
  TInputSchema extends z.ZodTypeAny,
  TInput extends TInputSchema | undefined,
  TResponse extends any,
> = Brand<ServerAction<TInputSchema, TInput, TResponse>, 'ServerAction'>;

interface CreateActionOptions<
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
> {
  input?: TInputSchema;
  action: (args: {
    input: z.input<TInputSchema>;
    ctx: { userId: string | null };
  }) => void | TResponse | Promise<void> | Promise<TResponse>;
}

export const createAction = <
  TInputSchema extends z.ZodTypeAny,
  TInput extends TInputSchema | undefined,
  TResponse extends any,
>(
  opts: CreateActionOptions<TInputSchema, TResponse>,
) => {
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
      const errorString = getErrorMessage(error);

      // next/navigation functions work by throwing an error that will be
      // processed internally by Next.js. So, in this case we need to rethrow it.
      if (errorString === 'NEXT_REDIRECT' || errorString == 'NEXT_NOT_FOUND') {
        throw error;
      }

      return {
        data: null,
        error: errorString,
      };
    }
  };

  return serverAction as BrandedServerAction<TInputSchema, TInput, TResponse>;
};
