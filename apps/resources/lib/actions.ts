import { z } from 'zod';
import { getErrorMessage } from './utils';

export const createServerAction = <TSchema extends z.ZodTypeAny>(
  inputSchema?: TSchema,
) => {
  return <TData extends any>(
    action: (input: z.infer<TSchema>) => Promise<void | {
      data?: TData;
      error?: string;
    }>,
  ) => {
    const validatedAction = async (input: z.infer<TSchema>) => {
      if (inputSchema) {
        const result = inputSchema.safeParse(input);
        if (!result.success) {
          return {
            data: null,
            error: result.error.message,
          };
        }
      }

      try {
        var result = await action(input);
      } catch (error) {
        return {
          data: null,
          error: getErrorMessage(error),
        };
      }

      return {
        data: result?.data ?? null,
        error: result?.error ?? null,
      };
    };

    return validatedAction;
  };
};
