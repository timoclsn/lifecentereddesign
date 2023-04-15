import { SignIn } from '@clerk/nextjs';
import { Layout } from 'components/Layout';

const SignInPage = () => (
  <Layout title="Sign in" slug="sign-in">
    <section className="flex items-center justify-center">
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
    </section>
  </Layout>
);

export default SignInPage;
