import {
  UilCheckCircle,
  UilEnvelopeAlt,
  UilExclamationTriangle,
  UilSpinnerAlt,
} from '@iconscout/react-unicons';
import { Button, Heading, InfoBox, Text } from 'design-system';
import { useZodForm } from 'hooks/useZodForm';
import { SubmitHandler } from 'react-hook-form';
import { trpc } from 'utils/trpc';
import { z } from 'zod';
import {
  errorStyles,
  ForrestSection,
  inputStyles,
} from './ForrestSection/ForrestSection';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

type SuggestionFormSchema = z.infer<typeof suggestionFormSchema>;
export const suggestionFormSchema = z.object({
  link: z.string().min(1, { message: 'Link is required' }).url({
    message: 'Must be a valid URL',
  }),
  message: z.string().optional(),
  name: z.string().optional(),
});

export const Suggestion = () => {
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

  const mutation = trpc.suggestion.submit.useMutation({
    onSuccess: () => {
      reset();
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      splitbee.track('Resource Suggestion');
    },
    onError: () => {
      setFocus('link', { shouldSelect: true });
    },
  });

  const onSubmit: SubmitHandler<SuggestionFormSchema> = ({
    link,
    message,
    name,
  }) => {
    mutation.mutate({
      link,
      message,
      name: userEmail || name,
    });
  };

  return (
    <ForrestSection id="suggestion">
      <Heading level="2" className="text-primary mb-6">
        Suggest Resource
      </Heading>
      <Text as="p" size="large" className="text-text-secondary mb-16">
        Surely there are a lot more great Life-centered Design resources out
        there. Help us discover and share them all! If we are missing something,
        just submit the resource and we&apos;ll review it and get it on the site
        as soon as possible.
      </Text>

      {/* Form */}
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
          {mutation.isLoading ? (
            <UilSpinnerAlt className="animate-spin" />
          ) : (
            <UilEnvelopeAlt />
          )}
          Submit
        </Button>

        {/* Server messages */}
        {mutation.isSuccess && (
          <InfoBox
            variant="success"
            icon={<UilCheckCircle />}
            className="animate-in zoom-in-0 fade-in duration-150 ease-in-out"
          >
            Thanks for your contribution! We&apos;ll get the resource on the
            site as soon as possible.
          </InfoBox>
        )}
        {mutation.isError && (
          <InfoBox
            variant="error"
            icon={<UilExclamationTriangle />}
            className="animate-in zoom-in-50 fade-in duration-150 ease-in-out"
          >
            {mutation.error.message}
          </InfoBox>
        )}
      </form>
    </ForrestSection>
  );
};
