import { z } from 'zod';
import { getErrorMessage } from '../utils';

type MaybePromise<T> = Promise<T> | T;

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

interface CreateActionClientOptions<Context> {
  middleware?: () => MaybePromise<Context>;
}

export interface ActionBuilderOptions<
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
  Context,
> {
  input?: TInputSchema;
  action: (args: {
    input: z.input<TInputSchema>;
    ctx: Context;
  }) => MaybePromise<void> | MaybePromise<TResponse>;
}

export const createActionClient = <Context>(
  createClientOpts?: CreateActionClientOptions<Context>,
) => {
  const actionBuilder = <
    TInputSchema extends z.ZodTypeAny,
    TInput extends TInputSchema | undefined,
    TResponse extends any,
  >(
    actionBuilderOpts: ActionBuilderOptions<TInputSchema, TResponse, Context>,
  ) => {
    const serverAction: ServerAction<TInputSchema, TInput, TResponse> = async (
      input,
    ) => {
      try {
        let parsedInput = input;
        if (actionBuilderOpts.input) {
          const result = actionBuilderOpts.input.safeParse(input);
          if (!result.success) {
            return {
              data: null,
              error: result.error.message,
            };
          }
          parsedInput = result.data;
        }

        const ctx = (await createClientOpts?.middleware?.()) ?? ({} as Context);

        const response = await actionBuilderOpts.action({
          input: parsedInput,
          ctx,
        });
        return {
          data: response ?? null,
          error: null,
        };
      } catch (error) {
        const errorString = getErrorMessage(error);

        // next/navigation functions work by throwing an error that will be
        // processed internally by Next.js. So, in this case we need to rethrow it.
        if (
          errorString === 'NEXT_REDIRECT' ||
          errorString == 'NEXT_NOT_FOUND'
        ) {
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

  return actionBuilder;
};
