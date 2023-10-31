import { z } from 'zod';
import {
  getErrorMessage,
  isNextNotFoundError,
  isNextRedirectError,
} from '../utils/utils';

type MaybePromise<T> = Promise<T> | T;

// If TInputSchema is a more specific type than z.ZodTypeAny (e.g. z.ZodString),
// then we can infer the input type. Otherwise, no input is needed.
export type InferInputType<TInputSchema extends z.ZodTypeAny> =
  z.ZodTypeAny extends TInputSchema ? void : z.infer<TInputSchema>;

export type InferValidationErrors<TInputSchema extends z.ZodTypeAny> =
  z.inferFlattenedErrors<TInputSchema>['fieldErrors'];

interface Result<TInputSchema extends z.ZodTypeAny, TResponse extends any> {
  data: TResponse | null;
  error: string | null;
  validationErrors: InferValidationErrors<TInputSchema> | null;
}

export type ServerAction<
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
> = (
  input: InferInputType<TInputSchema>,
) => Promise<Result<TInputSchema, TResponse>> | void;

export const createActionClient = <Context>(createClientOpts?: {
  middleware?: () => MaybePromise<Context>;
}) => {
  const actionBuilder = <
    TInputSchema extends z.ZodTypeAny,
    TResponse extends any,
  >(actionBuilderOpts: {
    input?: TInputSchema;
    action: (args: {
      input: z.output<TInputSchema>;
      ctx: Context;
    }) => MaybePromise<void> | MaybePromise<TResponse>;
  }) => {
    const createAction: ServerAction<TInputSchema, TResponse> = async (
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

        // The next/navigation functions (redirect() and notFound()) operate by deliberately triggering an error,
        // which will then be handled internally by Next.js. In this specific scenario,
        // we must intentionally propagate the error further.
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
