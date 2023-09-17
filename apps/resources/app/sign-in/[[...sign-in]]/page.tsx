import { SignIn } from '@clerk/nextjs';
import { Page } from 'components/Page/Page';
import { Heading } from 'design-system';
import { SearchParams } from 'lib/types';

interface Props {
  searchParams: SearchParams;
}

const SignInPage = ({ searchParams }: Props) => {
  return (
    <Page searchParams={searchParams}>
      <section className="mx-auto max-w-lg">
        <Heading level="1" className="mb-8">
          Sign in
        </Heading>
        <div className="flex items-center justify-center">
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
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
      </section>
    </Page>
  );
};

export default SignInPage;
