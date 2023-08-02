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
        <div className="relative h-8 w-8">
          <div className="bg-stone absolute left-0 top-0 h-8 w-8 animate-pulse rounded-full" />
          <div className="absolute left-0 top-0">
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
          </div>
        </div>
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
