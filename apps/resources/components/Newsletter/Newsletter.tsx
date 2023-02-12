import { zodResolver } from '@hookform/resolvers/zod';
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
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { trpc } from 'utils/trpc';
import { z } from 'zod';
import forestImg from './forest.jpg';

const inputVariants = cva(
  'px-10 py-6 text-2xl text-text-secondary bg-ghost-main-dark-bg focus-visible:outline-none',
  {
    variants: {
      error: {
        true: 'ring-2 ring-red-700',
        false: 'focus-visible:ring-2 focus-visible:ring-primary-main-bg',
      },
    },
  }
);

type ValidationSchema = z.infer<typeof validationSchema>;
const validationSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
});

export const Newsletter = () => {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = ({ email }) => {
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
              Signup for our Newsletter to get all the new resources and other
              Life-centered Design related news delivered to your inbox once a
              month. Clicking the button or input field will bring you to the
              signup page, where you will find further information.
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
                Newsletter Signup
              </Button>
            </form>
            {(mutation.isError || mutation.isSuccess) && (
              <div className="absolute left-0 bottom-10 w-full flex justify-center mt-20 animate-in slide-in-from-bottom-full duration-150 ease-in-out fade-in">
                <Container inset>
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
