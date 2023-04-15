import { SignUp } from '@clerk/nextjs';
import { Layout } from 'components/Layout';
import { Heading, Link, Text } from 'design-system';

const SignUpPage = () => (
  <Layout title="Sign up" slug="sign-up">
    <section>
      <Heading level="1" className="mb-8 max-w-3xl">
        Sign up
      </Heading>
      <Text as="p" size="large" className="text-text-secondary mb-20 max-w-5xl">
        Sign up for an account to be able to use personalized features like
        liking resources…
      </Text>
      <div className="flex flex-col items-center justify-center gap-20">
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
          }}
        />
        <Text
          as="p"
          size="medium"
          className="text-text-secondary mb-20 max-w-md"
        >
          With your registration you declare to have read and to agree with our{' '}
          <Link url="/privacy">privacy policy</Link>.
        </Text>
      </div>
    </section>
  </Layout>
);

export default SignUpPage;
