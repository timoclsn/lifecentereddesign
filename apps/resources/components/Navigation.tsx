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
            <a>
              <Heading as="span" level="4" className="hover:underline">
                LifeCenteredDesign.Net
              </Heading>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a
              className={`text-text-secondary hover:underline${
                pathname.includes('/about') ? ' underline' : ''
              }`}
            >
              <Text>About</Text>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/#resources">
            <a className="hover:underline">
              <Text weight="bold">Resources</Text>
            </a>
          </Link>
        </li>
      </ul>
    </header>
  );
}
