import { SignUp } from '@clerk/nextjs';
import { Layout } from 'components/Layout';

const SignUpPage = () => (
  <Layout title="Sign up" slug="sign-up">
    <section className="flex items-center justify-center">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        appearance={{
          variables: {
            colorPrimary: '#101b2c',
          },
        }}
      />
    </section>
  </Layout>
);

export default SignUpPage;
