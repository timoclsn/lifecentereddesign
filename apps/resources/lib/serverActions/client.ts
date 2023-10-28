import { useCallback, useReducer, useTransition } from 'react';
import { z } from 'zod';
import {
  getErrorMessage,
  isNextNotFoundError,
  isNextRedirectError,
} from '../utils/utils';
import { InferInputType, InferValidationErrors, ServerAction } from './server';

interface State<TResponse extends any, TInputSchema extends z.ZodTypeAny> {
  isIdle: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: TResponse | null;
  error: string | null;
  validationErrors: InferValidationErrors<TInputSchema> | null;
}

const initalState: State<any, any> = {
  isIdle: true,
  isSuccess: false,
  isError: false,
  data: null,
  error: null,
  validationErrors: null,
};

type Action<TResponse extends any, TInputSchema extends z.ZodTypeAny> =
  | { type: 'RUN_ACTION' }
  | { type: 'IS_SUCCESS'; data: TResponse | null }
  | {
      type: 'IS_ERROR';
      error: string | null;
      validationErrors: InferValidationErrors<TInputSchema> | null;
    }
  | { type: 'RESET' };

const createReducer =
  <TResponse extends any, TInputSchema extends z.ZodTypeAny>() =>
  (
    state: State<TResponse, TInputSchema>,
    action: Action<TResponse, TInputSchema>,
  ): State<TResponse, TInputSchema> => {
    switch (action.type) {
      case 'RUN_ACTION':
        return {
          ...state,
          isIdle: false,
          isSuccess: false,
          isError: false,
          error: null,
        };
      case 'IS_SUCCESS':
        return {
          ...state,
          isSuccess: true,
          data: action.data,
        };
      case 'IS_ERROR':
        return {
          ...state,
          isError: true,
          error: action.error,
          validationErrors: action.validationErrors,
        };
      case 'RESET':
        return {
          ...initalState,
        };
      default:
        throw new Error('Unknown action type');
    }
  };

export const useAction = <
  TInputSchema extends z.ZodTypeAny,
  TInput extends TInputSchema | undefined,
  TResponse extends any,
>(
  inputAction: ServerAction<TInputSchema, TInput, TResponse>,
  options: {
    onRunAction?: (input: InferInputType<TInputSchema, TInput>) => void;
    onSuccess?: (data: TResponse | null) => void;
    onError?: (
      error: string | null,
      validationErrors: InferValidationErrors<TInputSchema> | null,
    ) => void;
    onSettled?: () => void;
    reset?: () => void;
  } = {},
) => {
  const reducer = createReducer<TResponse, TInputSchema>();
  const [state, dispatch] = useReducer(reducer, initalState);
  const { isIdle, isSuccess, isError, data, error, validationErrors } = state;
  const [isRunning, startTransition] = useTransition();

  const runAction = useCallback(
    async (input: InferInputType<TInputSchema, TInput>) => {
      startTransition(async () => {
        dispatch({
          type: 'RUN_ACTION',
        });

        options.onRunAction?.(input);

        try {
          const result = await inputAction(input);

          if (result.error || result.validationErrors) {
            dispatch({
              type: 'IS_ERROR',
              error: result.error,
              validationErrors: result.validationErrors,
            });
            options.onError?.(result.error, result.validationErrors);
          } else {
            dispatch({
              type: 'IS_SUCCESS',
              data: result.data,
            });
            options.onSuccess?.(result.data);
          }
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

          const userErrorMessage = 'Something went wrong. Please try again.';
          dispatch({
            type: 'IS_ERROR',
            error: userErrorMessage,
            validationErrors: null,
          });
          options.onError?.(userErrorMessage, null);
          console.log(errorMessage);
        }

        options.onSettled?.();
      });
    },
    [inputAction, options],
  );

  const reset = useCallback(() => {
    () => {
      dispatch({
        type: 'RESET',
      });
    };
  }, []);

  return {
    runAction,
    isIdle,
    isRunning,
    isSuccess,
    isError,
    data,
    error,
    validationErrors,
    reset,
  };
};
