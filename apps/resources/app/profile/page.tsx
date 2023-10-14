import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserProfile,
} from '@clerk/nextjs';
import { Heading } from 'design-system';
import { DeleteAccountButton } from './DeleteAccountButton';

const ProfilePage = () => {
  return (
    <section className="mx-auto max-w-4xl">
      <Heading level="1" className="mb-8">
        Profile
      </Heading>
      <SignedIn>
        <div className="flex flex-col items-center justify-center gap-10">
          <UserProfile
            appearance={{
              variables: {
                colorPrimary: '#101b2c',
                borderRadius: 'none',
              },
              elements: {
                card: 'shadow-none',
              },
            }}
          />
          <div className="flex flex-col items-center justify-center gap-10">
            <DeleteAccountButton />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </section>
  );
};

export default ProfilePage;
