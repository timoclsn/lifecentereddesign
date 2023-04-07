import { SignIn } from '@clerk/nextjs';
import { Layout } from 'components/Layout';

const SignInPage = () => (
  <Layout title="Sign in" slug="sign-in">
    <section className="flex items-center justify-center">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </section>
  </Layout>
);

export default SignInPage;
