import { Heading, Text } from 'design-system';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Navigation() {
  const { pathname } = useRouter();
  return (
    <header className="flex items-center justify-between py-6 px-6 sm:px-8 xl:px-10">
      <ul className="flex w-full items-baseline gap-10">
        <li className="flex-1 font-serif text-2xl font-bold">
          <Link href="/">
            <Heading
              as="span"
              level="4"
              className="hover:text-text-secondary transition-colors"
            >
              Life Centered Design.Net
            </Heading>
          </Link>
        </li>
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
      </ul>
    </header>
  );
}
