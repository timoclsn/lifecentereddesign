'use client';

import { useUser } from '@clerk/nextjs';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Button, InfoBox } from 'design-system';
import { AlertTriangle, Check, CheckCircle2, Loader, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import {
  checkboxStyles,
  errorStyles,
  inputStyles,
} from '../ForrestSection/ForrestSection';
import { useZodForm } from '../../hooks/useZodForm';
import { subscribe } from './actions';
import { NewsletterFormSchema, newsletterFormSchema } from './schemas';

export const NewsletterForm = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    control,
    setValue,
    formState: { dirtyFields },
  } = useZodForm({
    schema: newsletterFormSchema,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const userEmail = user?.emailAddresses[0].emailAddress;

  useEffect(() => {
    if (userEmail && !dirtyFields.email) {
      setValue('email', userEmail);
    }
    if (!userEmail) {
      setValue('email', '');
    }
  }, [dirtyFields.email, userEmail, setValue]);

  const onSubmit: SubmitHandler<NewsletterFormSchema> = async (input) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError('');

    const { error } = await subscribe(input);
    setIsLoading(false);

    if (error) {
      setError(error);
      setFocus('email', { shouldSelect: true });
      return;
    }

    setIsSuccess(true);
    // @ts-expect-error: Errors because consens can only be true in schema
    reset({
      email: '',
      consens: false,
    });
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    splitbee.track('Newsletter Signup');
  };

  return (
    <form
      className="mx-auto flex w-full max-w-prose flex-col items-start gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Email input */}
      <div className="relative w-full">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email address"
          className={inputStyles({ error: !!errors.email })}
          {...register('email')}
        />
        {errors.email && <p className={errorStyles}>{errors.email.message}</p>}
      </div>

      {/* Consens checkbox */}
      <div className="relative flex items-center gap-3">
        <Controller
          name="consens"
          control={control}
          render={({ field }) => (
            <Checkbox.Root
              {...field}
              id="consens"
              value={undefined}
              checked={field.value}
              // @ts-expect-error: Errors because consens can only be true in schema
              onCheckedChange={field.onChange}
              className={checkboxStyles({ error: !!errors.consens })}
            >
              <span className="sr-only">Consens checkbox toggle button</span>
              <Checkbox.Indicator className="animate-in zoom-in-150 fade-in-50 duration-100">
                <Check />
              </Checkbox.Indicator>
            </Checkbox.Root>
          )}
        />
        <label className="Label" htmlFor="consens">
          Yes, I want to receive the newsletter
        </label>
        {errors.consens && (
          <p className={errorStyles}>{errors.consens.message}</p>
        )}
      </div>

      {/* Submit button */}
      <Button type="submit" size="large">
        {isLoading ? <Loader className="animate-spin" /> : <Mail />}
        Subscribe
      </Button>

      {/* Server messages */}
      {isSuccess && (
        <InfoBox
          variant="success"
          icon={<CheckCircle2 />}
          className="animate-in zoom-in-0 fade-in duration-150 ease-in-out"
        >
          Almost finished... We need to confirm your email address. To complete
          the subscription process, please click the link in the email we just
          sent you.
        </InfoBox>
      )}
      {error && (
        <InfoBox
          variant="error"
          icon={<AlertTriangle />}
          className="animate-in zoom-in-50 fade-in duration-150 ease-in-out"
        >
          {error}
        </InfoBox>
      )}
    </form>
  );
};
