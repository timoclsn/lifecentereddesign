import { Heading } from 'design-system';
import Link from 'next/link';
import { NavigationLink } from './NavigationLink';
import { UserButton } from './UserButton';

export const Navigation = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 px-6 py-6 sm:px-8 xl:px-10">
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
          <NavigationLink href="/#about">About</NavigationLink>
        </li>
        <li>
          <NavigationLink href="/resources">Resources</NavigationLink>
        </li>
        {/* <li>
          <NavigationLink href="/collections">Collections</NavigationLink>
        </li> */}
        <li>
          <UserButton />
        </li>
      </ul>
    </nav>
  );
};
