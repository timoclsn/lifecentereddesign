import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserProfile,
} from '@clerk/nextjs';
import { Layout } from 'components/Layout';

const ProfilePage = () => (
  <Layout title="Profile" slug="profile">
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

export default ProfilePage;
