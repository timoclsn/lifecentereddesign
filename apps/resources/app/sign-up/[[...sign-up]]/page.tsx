import { SignUp } from '@clerk/nextjs';
import { Page } from 'components/Page/Page';
import { Heading, Link, Text } from 'design-system';
import { SearchParams } from 'lib/types';

interface Props {
  searchParams: SearchParams;
}

const SignUpPage = ({ searchParams }: Props) => {
  return (
    <Page searchParams={searchParams}>
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
        <Text as="p" size="medium" className="text-text-secondary mt-8">
          With your registration you declare to have read and to agree with our{' '}
          <Link url="/privacy">privacy policy</Link>.
        </Text>
      </section>
    </Page>
  );
};

export default SignUpPage;
