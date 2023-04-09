import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button, Heading, Text } from 'design-system';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Navigation() {
  const { pathname } = useRouter();
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 px-6 py-6 sm:px-8 xl:px-10">
      <div className="font-serif text-2xl font-bold">
        <Link href="/">
          <Heading
            as="span"
            level="4"
            className="hover:text-text-secondary whitespace-nowrap transition-colors"
          >
            Life Centered Design.Net
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
          <SignedIn>
            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/profile"
              appearance={{
                variables: {
                  colorPrimary: '#101b2c',
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign in</Button>
            </SignInButton>
          </SignedOut>
        </li>
      </ul>
    </header>
  );
}
