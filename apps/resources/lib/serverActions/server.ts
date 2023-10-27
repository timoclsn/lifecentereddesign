import { z } from 'zod';
import {
  getErrorMessage,
  isNextNotFoundError,
  isNextRedirectError,
} from '../utils/utils';

type MaybePromise<T> = Promise<T> | T;

export type InferInputType<
  TInputSchema extends z.ZodTypeAny,
  TInput extends TInputSchema | undefined,
> = z.ZodTypeAny extends TInput ? void : z.input<TInputSchema>;

export type InferValidationErrors<TInputSchema extends z.ZodTypeAny> =
  z.inferFlattenedErrors<TInputSchema>['fieldErrors'];

interface Result<TInputSchema extends z.ZodTypeAny, TResponse> {
  data: TResponse | null;
  error: string | null;
  validationErrors: InferValidationErrors<TInputSchema> | null;
}

export type ServerAction<
  TInputSchema extends z.ZodTypeAny,
  TInput extends TInputSchema | undefined,
  TResponse,
> = (
  input: InferInputType<TInputSchema, TInput>,
) => Promise<Result<TInputSchema, TResponse>>;

export const createActionClient = <Context>(createClientOpts?: {
  middleware?: () => MaybePromise<Context>;
}) => {
  const actionBuilder = <
    TInputSchema extends z.ZodTypeAny,
    TInput extends TInputSchema | undefined,
    TResponse extends any,
  >(actionBuilderOpts: {
    input?: TInputSchema;
    action: (args: {
      input: z.input<TInputSchema>;
      ctx: Context;
    }) => MaybePromise<void> | MaybePromise<TResponse>;
  }) => {
    const createAction: ServerAction<TInputSchema, TInput, TResponse> = async (
      input,
    ) => {
      try {
        let parsedInput = input;
        if (actionBuilderOpts.input) {
          const result = actionBuilderOpts.input.safeParse(input);
          if (!result.success) {
            return {
              data: null,
              error: 'Invalid input',
              validationErrors: result.error.flatten().fieldErrors,
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
          validationErrors: null,
        };
      } catch (error) {
        const errorMessage = getErrorMessage(error);

        // next/navigation functions work by throwing an error that will be
        // processed internally by Next.js. So, in this case we need to rethrow it.
        if (
          isNextRedirectError(errorMessage) ||
          isNextNotFoundError(errorMessage)
        ) {
          throw error;
        }

        return {
          data: null,
          error: errorMessage,
          validationErrors: null,
        };
      }
    };

    return createAction;
  };

  return actionBuilder;
};
