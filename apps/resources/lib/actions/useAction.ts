import { useCallback, useState } from 'react';
import { z } from 'zod';
import { getErrorMessage } from '../utils';
import { ServerAction } from './createAction';

export const useAction = <TInput extends z.ZodTypeAny, TResponse extends any>(
  inputAction: ServerAction<TInput, TResponse>,
  options: {
    onSuccess?: (data: TResponse | null) => void;
    onError?: (error: string) => void;
  } = {},
) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAction = useCallback(
    async (input?: z.input<TInput>) => {
      setIsRunning(true);
      setIsSuccess(false);
      setIsError(false);
      setError(null);

      try {
        const result = await inputAction(input);

        if (result.error) {
          // Error
          setIsError(true);
          setError(result.error);
          options.onError?.(result.error);
        } else {
          // Success
          setIsSuccess(true);
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } catch (error) {
        // Error
        setIsError(true);
        setError(getErrorMessage(error));
        options.onError?.(getErrorMessage(error));
      }

      setIsRunning(false);
    },
    [inputAction, options],
  );

  return {
    runAction,
    isRunning,
    isSuccess,
    isError,
    data,
    error,
  };
};
