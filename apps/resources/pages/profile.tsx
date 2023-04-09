import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserProfile,
} from '@clerk/nextjs';
import { Layout } from 'components/Layout';
import { getCO2Consumtion } from 'lib/co2';
import { InferGetStaticPropsType } from 'next';

const ProfilePage = ({
  co2Consumption,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Profile" slug="profile" co2Consumption={co2Consumption}>
    <section className="flex items-center justify-center">
      <SignedIn>
        <UserProfile
          appearance={{
            variables: {
              colorPrimary: '#101b2c',
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
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

export default ProfilePage;
