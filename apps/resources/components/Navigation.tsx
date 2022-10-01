import { Heading, Text } from 'design-system';
import Link from 'next/link';

export function Navigation() {
  return (
    <header className="flex items-center justify-between py-6 px-6 sm:px-8 xl:px-10">
      <ul className="flex w-full items-baseline gap-10">
        <li className="flex-1 font-serif text-2xl font-bold hover:underline">
          <Link href="/">
            <a>
              <Heading as="span" level="4">
                Life Centered Design.Net
              </Heading>
            </a>
          </Link>
        </li>
        <li className="text-text-secondary hover:underline">
          <Link href="/about">
            <a>
              <Text>About</Text>
            </a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/#new-resources">
            <a>
              <Text weight="bold">Resources</Text>
            </a>
          </Link>
        </li>
      </ul>
    </header>
  );
}
