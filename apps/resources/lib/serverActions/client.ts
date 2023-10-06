import { useCallback, useReducer, useTransition } from 'react';
import { z } from 'zod';
import { getErrorMessage } from '../utils';
import { BrandedServerAction, InferInputType } from './server';

interface State<TResponse extends any> {
  isIdle: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: TResponse | null;
  error: string | null;
}

const initalState: State<any> = {
  isIdle: true,
  isSuccess: false,
  isError: false,
  data: null,
  error: null,
};

type Action<TResponse extends any> =
  | { type: 'RUN_ACTION' }
  | { type: 'IS_SUCCESS'; data: TResponse | null }
  | { type: 'IS_ERROR'; error: string };

const createReducer =
  <TResponse extends any>() =>
  (state: State<TResponse>, action: Action<TResponse>): State<TResponse> => {
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
  inputAction: BrandedServerAction<TInputSchema, TInput, TResponse>,
  options: {
    onRunAction?: (input: InferInputType<TInputSchema, TInput>) => void;
    onSuccess?: (data: TResponse | null) => void;
    onError?: (error: string) => void;
    onSettled?: () => void;
  } = {},
) => {
  const reducer = createReducer<TResponse>();
  const [state, dispatch] = useReducer(reducer, initalState);
  const { isIdle, isSuccess, isError, data, error } = state;
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

          if (result.error) {
            dispatch({
              type: 'IS_ERROR',
              error: result.error,
            });
            options.onError?.(result.error);
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
            errorMessage === 'NEXT_REDIRECT' ||
            errorMessage == 'NEXT_NOT_FOUND'
          ) {
            throw error;
          }

          const userErrorMessage = 'Something went wrong. Please try again.';
          dispatch({
            type: 'IS_ERROR',
            error: userErrorMessage,
          });
          options.onError?.(userErrorMessage);
          console.log(errorMessage);
        }

        options.onSettled?.();
      });
    },
    [inputAction, options],
  );

  return {
    runAction,
    isIdle,
    isRunning,
    isSuccess,
    isError,
    data,
    error,
  };
};
