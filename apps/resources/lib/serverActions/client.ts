import { useCallback, useReducer, useTransition } from 'react';
import { z } from 'zod';
import {
  ClientActionAction,
  ClientActionState,
  InferInputArgs,
  InferValidationErrors,
  ServerAction,
} from './types';

const initalState: ClientActionState<any, any> = {
  status: 'idle',
  isIdle: true,
  isSuccess: false,
  isError: false,
  data: null,
  error: null,
  validationErrors: null,
};

const createReducer =
  <TResponse extends any, TInputSchema extends z.ZodTypeAny>() =>
  (
    state: ClientActionState<TResponse, TInputSchema>,
    action: ClientActionAction<TResponse, TInputSchema>,
  ): ClientActionState<TResponse, TInputSchema> => {
    switch (action.type) {
      case 'RUN_ACTION':
        return {
          ...state,
          status: 'running',
          isIdle: false,
          isSuccess: false,
          isError: false,
          error: null,
        };
      case 'IS_SUCCESS':
        return {
          ...state,
          status: 'success',
          isIdle: true,
          isSuccess: true,
          data: action.data,
        };
      case 'IS_ERROR':
        return {
          ...state,
          status: 'error',
          isIdle: true,
          isError: true,
          error: action.error,
        };
      case 'IS_VALIDATION_ERROR':
        return {
          ...state,
          status: 'error',
          isIdle: true,
          isError: true,
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
  TResponse extends any,
>(
  inputAction: ServerAction<TInputSchema, TResponse>,
  options: {
    onRunAction?: (...inputArgs: InferInputArgs<TInputSchema>) => void;
    onSuccess?: (data: TResponse | null) => void;
    onError?: (errors: {
      error: string | null;
      validationErrors: InferValidationErrors<TInputSchema> | null;
    }) => void;
    onSettled?: () => void;
    reset?: () => void;
  } = {},
) => {
  const reducer = createReducer<TResponse, TInputSchema>();
  const [state, dispatch] = useReducer(reducer, initalState);
  const { status, isIdle, isSuccess, isError, data, error, validationErrors } =
    state;
  const [isRunning, startTransition] = useTransition();

  const runAction = useCallback(
    async (...inputArgs: InferInputArgs<TInputSchema>) => {
      startTransition(async () => {
        dispatch({
          type: 'RUN_ACTION',
        });

        options.onRunAction?.(...inputArgs);

        try {
          const result = await inputAction(...inputArgs);

          // If /next/navigation function (redirect() and notFound()) is called in the action, the result will be undefined
          // Skip processing because the page will be redirected
          if (!result) {
            return;
          }

          if (result.state === 'validationError') {
            dispatch({
              type: 'IS_VALIDATION_ERROR',
              validationErrors: result.validationErrors,
            });
            options.onError?.({
              error: null,
              validationErrors: result.validationErrors,
            });
          }

          if (result.state === 'error') {
            dispatch({
              type: 'IS_ERROR',
              error: result.error,
            });
            options.onError?.({
              error: result.error,
              validationErrors: null,
            });
          }

          if (result.state === 'success') {
            dispatch({
              type: 'IS_SUCCESS',
              data: result.data,
            });
            options.onSuccess?.(result.data);
          }
        } catch (error) {
          const userErrorMessage = 'Something went wrong. Please try again.';
          dispatch({
            type: 'IS_ERROR',
            error: userErrorMessage,
          });
          options.onError?.({
            error: userErrorMessage,
            validationErrors: null,
          });
          console.error(error);
        }

        options.onSettled?.();
      });
    },
    [inputAction, options],
  );

  const reset = useCallback(() => {
    dispatch({
      type: 'RESET',
    });
  }, []);

  return {
    runAction,
    status,
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