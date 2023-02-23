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
import { ForrestSection, inputStyles } from './ForrestSection/ForrestSection';

type SuggestionFormSchema = z.infer<typeof suggestionFormSchema>;
export const suggestionFormSchema = z.object({
  link: z.string().min(1, { message: 'Link is required' }).url({
    message: 'Must be a valid URL',
  }),
  message: z.string().optional(),
});

export const Suggestion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useZodForm({
    schema: suggestionFormSchema,
  });

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

  const onSubmit: SubmitHandler<SuggestionFormSchema> = ({ link, message }) => {
    mutation.mutate({
      link,
      message,
    });
  };

  return (
    <ForrestSection id="suggestion">
      <Heading level="2" className="text-primary mb-6">
        Suggest Resource
      </Heading>
      <Text as="p" size="large" className="mb-16 text-text-secondary">
        Surely there are a lot more great life-centered design resources out
        there. Help us discover and share them all. If we are missing something
        just submit the resource and we&apos;ll get it on the site as soon as
        possible.
      </Text>

      {/* Form */}
      <form
        className="w-full max-w-prose mx-auto flex flex-col items-start gap-10"
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
          {errors.link && (
            <p className="absolute left-0 bottom-0 -mb-6 text-red-700 text-sm">
              {errors.link.message}
            </p>
          )}
        </div>

        {/* Message input */}
        <div className="relative w-full">
          <label htmlFor="link" className="sr-only">
            Optional message
          </label>
          <textarea
            id="message"
            placeholder="Optional message about the resource"
            rows={6}
            className={inputStyles({ error: !!errors.message })}
            {...register('message')}
          />
          {errors.message && (
            <p className="absolute left-0 bottom-0 -mb-6 text-red-700 text-sm">
              {errors.message.message}
            </p>
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
            className="animate-in zoom-in-0 duration-150 ease-in-out fade-in"
          >
            Thanks for your contribution! We&apos;ll get the resource on the
            site as soon as possible.
          </InfoBox>
        )}
        {mutation.isError && (
          <InfoBox
            variant="error"
            icon={<UilExclamationTriangle />}
            className="animate-in zoom-in-50 duration-150 ease-in-out fade-in"
          >
            {mutation.error.message}
          </InfoBox>
        )}
      </form>
    </ForrestSection>
  );
};
