import { SignUp } from '@clerk/nextjs';
import { Layout } from 'components/Layout';
import { getCO2Consumtion } from 'lib/co2';
import { InferGetStaticPropsType } from 'next';

const SignUpPage = ({
  co2Consumption,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Sign up" slug="sign-up" co2Consumption={co2Consumption}>
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

export default SignUpPage;
