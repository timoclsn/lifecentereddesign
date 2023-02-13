import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormProps } from 'react-hook-form';
import { z } from 'zod';

export const useZodForm = <TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema;
  }
) => {
  return useForm<TSchema['_input']>({
    ...props,
    resolver: zodResolver(props.schema),
  });
};
