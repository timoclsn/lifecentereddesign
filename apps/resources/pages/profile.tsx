import {
  RedirectToSignIn,
  SignIn,
  SignedIn,
  SignedOut,
  UserProfile,
} from '@clerk/nextjs';
import { Layout } from 'components/Layout';

const ProfilePage = () => (
  <Layout title="Sign in" slug="sign-in">
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
