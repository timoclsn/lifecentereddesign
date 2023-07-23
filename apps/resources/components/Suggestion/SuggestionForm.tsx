'use client';

import { useUser } from '@clerk/nextjs';
import {
  UilCheckCircle,
  UilEnvelopeAlt,
  UilExclamationTriangle,
  UilSpinnerAlt,
} from '@iconscout/react-unicons';
import {
  errorStyles,
  inputStyles,
} from 'components/ForrestSection/ForrestSection';
import { Button, InfoBox } from 'design-system';
import { useZodForm } from 'hooks/useZodForm';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { SuggestionFormSchema, suggestionFormSchema } from './schemas';

interface Props {
  submit: (input: SuggestionFormSchema) => Promise<{ error: string }>;
}

export const SuggestionForm = ({ submit }: Props) => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
    formState: { dirtyFields },
  } = useZodForm({
    schema: suggestionFormSchema,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  let name = '';
  const userName = user?.fullName;
  const userEmail = user?.emailAddresses[0].emailAddress;

  if (userName && userEmail) {
    name = `${userName} (${userEmail})`;
  } else {
    name = userName || userEmail || '';
  }

  useEffect(() => {
    if (name && !dirtyFields.name) {
      setValue('name', name);
    }
    if (!name) {
      setValue('name', '');
    }
    name;
  }, [dirtyFields.name, name, setValue]);

  const onSubmit: SubmitHandler<SuggestionFormSchema> = async ({
    link,
    message,
    name,
  }) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError('');

    const { error } = await submit({
      link,
      message,
      name: userEmail || name,
    });
    setIsLoading(false);

    if (error) {
      setError(error);
      setFocus('link', { shouldSelect: true });
      return;
    }

    setIsSuccess(true);
    reset();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    splitbee.track('Resource Suggestion');
  };

  return (
    <form
      className="mx-auto flex w-full max-w-prose flex-col items-start gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Link input */}
      <div className="relative w-full">
        <label htmlFor="link" className="sr-only">
          Resource link
        </label>
        <input
          id="link"
          type="url"
          placeholder="Link to resource"
          className={inputStyles({ error: !!errors.link })}
          {...register('link')}
        />
        {errors.link && <p className={errorStyles}>{errors.link.message}</p>}
      </div>

      {/* Name input */}
      <div className="relative w-full">
        <label htmlFor="link" className="sr-only">
          Optional Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name for attribution (optional)"
          className={inputStyles({ error: !!errors.name })}
          {...register('name')}
        />
        {errors.name && <p className={errorStyles}>{errors.name.message}</p>}
      </div>

      {/* Message input */}
      <div className="relative w-full">
        <label htmlFor="link" className="sr-only">
          Optional message
        </label>
        <textarea
          id="message"
          placeholder="Message about the resource (optional)"
          rows={6}
          className={inputStyles({ error: !!errors.message })}
          {...register('message')}
        />
        {errors.message && (
          <p className={errorStyles}>{errors.message.message}</p>
        )}
      </div>

      {/* Submit button */}
      <Button type="submit" size="large">
        {isLoading ? (
          <UilSpinnerAlt className="animate-spin" />
        ) : (
          <UilEnvelopeAlt />
        )}
        Submit
      </Button>

      {/* Server messages */}
      {isSuccess && (
        <InfoBox
          variant="success"
          icon={<UilCheckCircle />}
          className="animate-in zoom-in-0 fade-in duration-150 ease-in-out"
        >
          Thanks for your contribution! We&apos;ll get the resource on the site
          as soon as possible.
        </InfoBox>
      )}
      {error && (
        <InfoBox
          variant="error"
          icon={<UilExclamationTriangle />}
          className="animate-in zoom-in-50 fade-in duration-150 ease-in-out"
        >
          {error}
        </InfoBox>
      )}
    </form>
  );
};
