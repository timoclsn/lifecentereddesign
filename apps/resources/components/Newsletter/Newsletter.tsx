import {
  UilCheckCircle,
  UilEnvelopeAlt,
  UilExclamationTriangle,
  UilSpinnerAlt,
} from '@iconscout/react-unicons';
import { cva } from 'class-variance-authority';
import {
  Bleed,
  Button,
  Container,
  Heading,
  InfoBox,
  Text,
} from 'design-system';
import { useZodForm } from 'hooks/useZodForm';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { trpc } from 'utils/trpc';
import { z } from 'zod';
import forestImg from './forest.jpg';

const inputVariants = cva(
  'px-10 py-6 text-2xl text-text-secondary bg-ghost-main-dark-bg focus-visible:outline-none',
  {
    variants: {
      error: {
        true: 'ring-2 ring-red-700',
        false: 'focus-visible:ring-2 focus-visible:ring-ghost-contrast-text',
      },
    },
  }
);

type NewsletterFormSchema = z.infer<typeof newsletterFormSchema>;
export const newsletterFormSchema = z.object({
  email: z.string().min(1, { message: 'Email address is required' }).email({
    message: 'Must be a valid email address',
  }),
});

export const Newsletter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useZodForm({
    schema: newsletterFormSchema,
  });

  const mutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      reset();
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      splitbee.track('Newsletter Signup');
    },
    onError: () => {
      setFocus('email', { shouldSelect: true });
    },
  });

  const onSubmit: SubmitHandler<NewsletterFormSchema> = ({ email }) => {
    mutation.mutate({
      email,
    });
  };

  return (
    <Bleed>
      <section className="relative overflow-hidden bg-[#EDF4EE]">
        <Image
          src={forestImg}
          alt="Image of a foggy forest."
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="relative py-28">
          <Container inset>
            <Heading level="2" className="text-primary mb-10">
              Newsletter
            </Heading>
            <Text as="p" size="large" className="mb-16 text-text-secondary">
              Sign up for our Newsletter to get all the new resources and other
              Life-centered Design related news delivered to your inbox once a
              month.
            </Text>
            <form
              className="w-full flex justify-center items-center gap-x-8 gap-y-12 flex-wrap mb-28"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="relative">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  className={inputVariants({ error: !!errors.email })}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="absolute left-0 -bottom-8 text-red-700">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" size="large">
                {mutation.isLoading ? (
                  <UilSpinnerAlt className="animate-spin" />
                ) : (
                  <UilEnvelopeAlt />
                )}
                Subscribe
              </Button>
            </form>
            <Text as="p" size="small" className="mb-16 text-text-secondary">
              By subscribing to our newsletter you also give us your consent
              that we analyze, track and store the opening- and click-rates to
              optimize our newsletter and services. You can unsubscribe at any
              time by clicking the link in the footer of our emails. We use the
              newsletter provider Mailchimp. For detailed information about our
              privacy practices, please visit our{' '}
              <Link href="/privacy" className="underline hover:opacity-80">
                privacy policy
              </Link>
              .
            </Text>
            {(mutation.isError || mutation.isSuccess) && (
              <div className="absolute left-0 bottom-10 w-full mt-20 animate-in slide-in-from-bottom-full duration-150 ease-in-out fade-in">
                <Container inset className="flex flex-col items-center">
                  {mutation.isError && (
                    <InfoBox variant="error" icon={<UilExclamationTriangle />}>
                      {mutation.error.message}
                    </InfoBox>
                  )}
                  {mutation.isSuccess && (
                    <InfoBox variant="success" icon={<UilCheckCircle />}>
                      Almost finished... We need to confirm your email address.
                      To complete the subscription process, please click the
                      link in the email we just sent you.
                    </InfoBox>
                  )}
                </Container>
              </div>
            )}
          </Container>
        </div>
      </section>
    </Bleed>
  );
};
