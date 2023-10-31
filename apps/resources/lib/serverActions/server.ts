import { z } from 'zod';
import {
  getErrorMessage,
  isNextNotFoundError,
  isNextRedirectError,
} from '../utils/utils';

type MaybePromise<T> = Promise<T> | T;

// If TInputSchema is a more specific type than z.ZodTypeAny (e.g. z.ZodString),
// then we can infer the input type. Otherwise, no input is needed.
export type InferInputArgs<TInputSchema extends z.ZodTypeAny> =
  z.ZodTypeAny extends TInputSchema ? [] : [input: z.infer<TInputSchema>];

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
  ...inputArgs: InferInputArgs<TInputSchema>
) => Promise<Result<TInputSchema, TResponse>> | void;

export const createActionClient = <Context>(createClientOpts?: {
  middleware?: () => MaybePromise<Context>;
}) => {
  const createAction = <
    TInputSchema extends z.ZodTypeAny,
    TResponse extends any,
  >(actionBuilderOpts: {
    input?: TInputSchema;
    action: (actionArgs: {
      input: z.output<TInputSchema>;
      ctx: Context;
    }) => MaybePromise<void> | MaybePromise<TResponse>;
  }) => {
    const action: ServerAction<TInputSchema, TResponse> = async (
      ...inputArgs
    ) => {
      const [input] = inputArgs;
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

    return action;
  };

  return createAction;
};
