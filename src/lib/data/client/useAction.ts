import { useCallback, useReducer, useTransition } from 'react';
import { z } from 'zod';
import {
  InferInputArgs,
  InferValidationErrors,
  Result,
  ServerAction,
} from '../types';
import { initalState } from './initialState';

type Action<TInputSchema extends z.ZodTypeAny, TResponse extends any> =
  | { type: 'RUN_ACTION' }
  | { type: 'IS_SUCCESS'; data: TResponse | null }
  | {
      type: 'IS_VALIDATION_ERROR';
      validationErrors: InferValidationErrors<TInputSchema>;
    }
  | {
      type: 'IS_ERROR';
      error: string;
    }
  | { type: 'RESET' };

const createReducer =
  <TInputSchema extends z.ZodTypeAny, TResponse extends any>() =>
  (
    state: Result<TInputSchema, TResponse>,
    action: Action<TInputSchema, TResponse>,
  ): Result<TInputSchema, TResponse> => {
    switch (action.type) {
      case 'RUN_ACTION':
        return {
          ...state,
          status: 'running',
          validationErrors: null,
          error: null,
        };
      case 'IS_SUCCESS':
        return {
          ...state,
          status: 'success',
          data: action.data,
          validationErrors: null,
          error: null,
        };
      case 'IS_VALIDATION_ERROR':
        return {
          ...state,
          status: 'validationError',
          validationErrors: action.validationErrors,
          error: null,
        };
      case 'IS_ERROR':
        return {
          ...state,
          status: 'error',
          validationErrors: null,
          error: action.error,
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
  TResponse extends any,
>(
  inputAction: ServerAction<TInputSchema, TResponse>,
  options: {
    onRunAction?: (...inputArgs: InferInputArgs<TInputSchema>) => void;
    onSuccess?: (
      data: TResponse | null,
      ...inputArgs: InferInputArgs<TInputSchema>
    ) => void;
    onError?: (
      errors: {
        error: string | null;
        validationErrors: InferValidationErrors<TInputSchema> | null;
      },
      ...inputArgs: InferInputArgs<TInputSchema>
    ) => void;
    onSettled?: (...inputArgs: InferInputArgs<TInputSchema>) => void;
    onReset?: () => void;
  } = {},
) => {
  const reducer = createReducer<TInputSchema, TResponse>();
  const [state, dispatch] = useReducer(reducer, initalState);
  const { status, data, error, validationErrors } = state;
  const isSuccess = status === 'success';
  const isError = status === 'error' || status === 'validationError';
  const [isRunning, startTransition] = useTransition();

  const runAction = useCallback(
    async (...inputArgs: InferInputArgs<TInputSchema>) => {
      options.onRunAction?.(...inputArgs);

      dispatch({
        type: 'RUN_ACTION',
      });

      startTransition(async () => {
        try {
          const result = await inputAction(...inputArgs);

          // If /next/navigation function (redirect() and notFound()) is called in the action, the result will be undefined
          // Skip processing because the page will be redirected
          if (!result) {
            dispatch({
              type: 'IS_SUCCESS',
              data: null,
            });
            options.onSuccess?.(null, ...inputArgs);
            return;
          }

          if (result.status === 'success') {
            dispatch({
              type: 'IS_SUCCESS',
              data: result.data,
            });
            options.onSuccess?.(result.data, ...inputArgs);
          }

          if (result.status === 'validationError') {
            dispatch({
              type: 'IS_VALIDATION_ERROR',
              validationErrors: result.validationErrors,
            });
            options.onError?.(
              {
                error: null,
                validationErrors: result.validationErrors,
              },
              ...inputArgs,
            );
          }

          if (result.status === 'error') {
            dispatch({
              type: 'IS_ERROR',
              error: result.error,
            });
            options.onError?.(
              {
                error: result.error,
                validationErrors: null,
              },
              ...inputArgs,
            );
          }
        } catch (error) {
          const userErrorMessage = 'Something went wrong. Please try again.';
          dispatch({
            type: 'IS_ERROR',
            error: userErrorMessage,
          });
          options.onError?.(
            {
              error: userErrorMessage,
              validationErrors: null,
            },
            ...inputArgs,
          );
          console.error(error);
        }
      });

      options.onSettled?.(...inputArgs);
    },
    [inputAction, options],
  );

  const reset = useCallback(() => {
    dispatch({
      type: 'RESET',
    });
    options.onReset?.();
  }, [options]);

  return {
    runAction,
    status,
    isRunning,
    isSuccess,
    isError,
    data: data as TResponse | null, // Needed because since TS 5.8 it wouldn't infer the type correctly
    error,
    validationErrors,
    reset,
  };
};
