import { SignUp } from '@clerk/nextjs';
import { Heading, Link, Text } from '@/design-system';

const SignUpPage = () => {
  return (
    <section className="mx-auto max-w-lg">
      <Heading level="1" className="mb-8">
        Sign up
      </Heading>
      <Text as="p" size="large" className="mb-12 text-text-secondary">
        Sign up for an account to be able to use personalized features like
        liking resources and more.
      </Text>
      <div className="flex items-center justify-center">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          appearance={{
            layout: {
              privacyPageUrl: '/privacy',
              socialButtonsPlacement: 'bottom',
              socialButtonsVariant: 'blockButton',
            },
            variables: {
              colorPrimary: '#101b2c',
              borderRadius: 'none',
            },
            elements: {
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              card: 'shadow-none',
            },
          }}
        />
      </div>
      <Text as="p" size="medium" className="mt-8 text-text-secondary">
        With your registration you declare to have read and to agree with our{' '}
        <Link url="/privacy">privacy policy</Link>.
      </Text>
    </section>
  );
};

export default SignUpPage;
