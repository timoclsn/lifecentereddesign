import { SignIn } from '@clerk/nextjs';
import { Layout } from 'components/Layout';
import { getCO2Consumtion } from 'lib/co2';
import { InferGetStaticPropsType } from 'next';

const SignInPage = ({
  co2Consumption,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Sign in" slug="sign-in" co2Consumption={co2Consumption}>
    <section className="flex items-center justify-center">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        appearance={{
          variables: {
            colorPrimary: '#101b2c',
          },
        }}
      />
    </section>
  </Layout>
);

export const getStaticProps = async () => {
  const co2Consumption = await getCO2Consumtion('lifecentereddesign.net');

  return {
    props: {
      co2Consumption,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export default SignInPage;
