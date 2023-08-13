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
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const action = useCallback(
    async (input?: z.infer<TInput>) => {
      setIsLoading(true);
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

      setIsLoading(false);
    },
    [inputAction, options],
  );

  return {
    action,
    isLoading,
    isSuccess,
    isError,
    data,
    error,
  };
};
