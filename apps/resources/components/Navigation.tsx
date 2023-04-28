import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { UilSpinnerAlt } from '@iconscout/react-unicons';
import { Button, Heading, Text } from 'design-system';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Navigation() {
  const { pathname } = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 px-6 py-6 sm:px-8 xl:px-10">
      <div className="font-serif text-2xl font-bold">
        <Link href="/">
          <Heading
            as="span"
            level="4"
            className="hover:text-text-secondary break-all transition-colors"
          >
            LifeCenteredDesign.Net
          </Heading>
        </Link>
      </div>

      <ul className="flex items-center gap-10">
        <li>
          <Link
            href="/#about"
            className="hover:text-text-secondary transition-colors"
          >
            <Text>About</Text>
          </Link>
        </li>
        <li>
          <Link
            href="/resources"
            className="hover:text-text-secondary transition-colors"
          >
            <Text weight={pathname.includes('/resources') ? 'bold' : 'normal'}>
              Resources
            </Text>
          </Link>
        </li>
        <li>
          {!isLoaded && <UilSpinnerAlt className="mx-8 animate-spin" />}
          {isLoaded && !isSignedIn && (
            <SignInButton>
              <Button variant="outline" size="small">
                Sign in
              </Button>
            </SignInButton>
          )}
          {isLoaded && isSignedIn && (
            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/profile"
              appearance={{
                variables: {
                  colorPrimary: '#101b2c',
                },
              }}
              afterSignOutUrl="/"
            />
          )}
        </li>
      </ul>
    </header>
  );
}
