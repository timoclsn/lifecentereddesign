import {
  UilCheck,
  UilCheckCircle,
  UilEnvelopeAlt,
  UilExclamationTriangle,
  UilSpinnerAlt,
} from '@iconscout/react-unicons';
import * as Checkbox from '@radix-ui/react-checkbox';
import {
  checkboxStyles,
  errorStyles,
  ForrestSection,
  inputStyles,
} from 'components/ForrestSection/ForrestSection';
import { Button, Heading, InfoBox, Link, Text } from 'design-system';
import { useZodForm } from 'hooks/useZodForm';
import NextLink from 'next/link';
import { Controller, SubmitHandler } from 'react-hook-form';
import { trpc } from 'utils/trpc';
import { z } from 'zod';

type NewsletterFormSchema = z.infer<typeof newsletterFormSchema>;
export const newsletterFormSchema = z.object({
  email: z.string().min(1, { message: 'Email address is required' }).email({
    message: 'Must be a valid email address',
  }),
  consens: z.literal(true, {
    errorMap: () => ({
      message: 'You must confirm that you want to subscribe',
    }),
  }),
});

export const Newsletter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    control,
  } = useZodForm({
    schema: newsletterFormSchema,
  });

  const mutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      reset({
        email: '',
        // @ts-expect-error
        consens: false,
      });
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      splitbee.track('Newsletter Signup');
    },
    onError: () => {
      setFocus('email', { shouldSelect: true });
    },
  });

  const onSubmit: SubmitHandler<NewsletterFormSchema> = ({
    email,
    consens,
  }) => {
    mutation.mutate({
      email,
      consens,
    });
  };

  return (
    <ForrestSection id="newsletter">
      <Heading level="2" className="text-primary mb-6">
        Newsletter
      </Heading>
      <Text as="p" size="large" className="mb-16 text-text-secondary">
        Sign up for our Newsletter to get all the new resources and other
        Life-centered Design related news delivered to your inbox once a month.
      </Text>

      {/* Form */}
      <form
        className="w-full max-w-prose mx-auto flex flex-col items-start gap-10"
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
          {errors.email && (
            <p className={errorStyles}>{errors.email.message}</p>
          )}
        </div>

        {/* Consens checkbox */}
        <div className="relative flex gap-3 items-center">
          <Controller
            name="consens"
            control={control}
            render={({ field }) => (
              <Checkbox.Root
                {...field}
                id="consens"
                value={undefined}
                checked={field.value}
                onCheckedChange={field.onChange}
                className={checkboxStyles({ error: !!errors.consens })}
              >
                <Checkbox.Indicator className="animate-in zoom-in-150 fade-in-50 duration-100">
                  <UilCheck />
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
          {mutation.isLoading ? (
            <UilSpinnerAlt className="animate-spin" />
          ) : (
            <UilEnvelopeAlt />
          )}
          Subscribe
        </Button>

        {/* Server messages */}
        {mutation.isSuccess && (
          <InfoBox
            variant="success"
            icon={<UilCheckCircle />}
            className="animate-in zoom-in-0 duration-150 ease-in-out fade-in"
          >
            Almost finished... We need to confirm your email address. To
            complete the subscription process, please click the link in the
            email we just sent you.
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

        {/* Info text */}
        <Text as="p" size="small" className="text-text-secondary mx-auto mb-40">
          By subscribing to our newsletter you also give us your consent that we
          analyze, track and store the opening- and click-rates to optimize our
          newsletter and services. You can unsubscribe at any time by clicking
          the link in the footer of our emails. We use the newsletter provider
          Mailchimp. For detailed information about our privacy practices,
          please visit our{' '}
          <Link as={NextLink} url="/privacy">
            privacy policy
          </Link>
          . Learn more about Mailchimp&apos;s privacy practices{' '}
          <Link url="https://mailchimp.com/legal/terms" external>
            here.
          </Link>
        </Text>
      </form>
    </ForrestSection>
  );
};