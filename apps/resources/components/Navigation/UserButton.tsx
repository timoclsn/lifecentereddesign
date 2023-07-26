import {
  UserButton as ClerkUserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import { Button } from 'design-system';

export const UserButton = () => {
  return (
    <>
      <SignedIn>
        <ClerkUserButton
          userProfileMode="navigation"
          userProfileUrl="/profile"
          appearance={{
            variables: {
              colorPrimary: '#101b2c',
            },
          }}
          afterSignOutUrl="/"
        />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button variant="outline" size="small">
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
