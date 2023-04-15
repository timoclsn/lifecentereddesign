import { SignIn } from '@clerk/nextjs';
import { Layout } from 'components/Layout';
import { Heading } from 'design-system';

const SignInPage = () => (
  <Layout title="Sign in" slug="sign-in">
    <section>
      <Heading level="1" className="max-w-3x mb-8">
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
            },
          }}
        />
      </div>
    </section>
  </Layout>
);

export default SignInPage;
