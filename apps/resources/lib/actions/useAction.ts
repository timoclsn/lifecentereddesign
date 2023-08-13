import { useCallback, useReducer } from 'react';
import { z } from 'zod';
import { getErrorMessage } from '../utils';
import { BrandedServerAction } from './createAction';

interface State<TResponse extends any> {
  isIdle: boolean;
  isRunning: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: TResponse | null;
  error: string | null;
}

const initalState: State<any> = {
  isIdle: true,
  isRunning: false,
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
          isRunning: true,
          isSuccess: false,
          isError: false,
          error: null,
        };
      case 'IS_SUCCESS':
        return {
          ...state,
          isRunning: false,
          isSuccess: true,
          data: action.data,
        };
      case 'IS_ERROR':
        return {
          ...state,
          isRunning: false,
          isError: true,
          error: action.error,
        };
      default:
        throw new Error('Unknown action type');
    }
  };

export const useAction = <TInput extends z.ZodTypeAny, TResponse extends any>(
  inputAction: BrandedServerAction<TInput, TResponse>,
  options: {
    onRunAction?: (input?: z.input<TInput>) => void;
    onSuccess?: (data: TResponse | null) => void;
    onError?: (error: string) => void;
    onSettled?: () => void;
  } = {},
) => {
  const reducer = createReducer<TResponse>();
  const [state, dispatch] = useReducer(reducer, initalState);
  const { isIdle, isRunning, isSuccess, isError, data, error } = state;

  const runAction = useCallback(
    async (input?: z.input<TInput>) => {
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
        const errorMessage = 'Something went wrong. Please try again.';
        dispatch({
          type: 'IS_ERROR',
          error: errorMessage,
        });
        options.onError?.(errorMessage);
        console.log(getErrorMessage(error));
      }

      options.onSettled?.();
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
