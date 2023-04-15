import { SignUp } from '@clerk/nextjs';
import { Layout } from 'components/Layout';
import { Heading, Link, Text } from 'design-system';

const SignUpPage = () => (
  <Layout title="Sign up" slug="sign-up">
    <section className="mx-auto max-w-lg">
      <Heading level="1" className="mb-8">
        Sign up
      </Heading>
      <Text as="p" size="large" className="text-text-secondary mb-12">
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
            },
            elements: {
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
            },
          }}
        />
      </div>
      <Text as="p" size="medium" className="text-text-secondary mt-8">
        With your registration you declare to have read and to agree with our{' '}
        <Link url="/privacy">privacy policy</Link>.
      </Text>
    </section>
  </Layout>
);

export default SignUpPage;
