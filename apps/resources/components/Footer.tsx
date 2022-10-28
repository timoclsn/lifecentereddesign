import { Text } from 'design-system';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto flex justify-between gap-4 py-10 px-6 text-text-secondary sm:gap-10 sm:px-8 xl:px-10">
      <ul className="flex flex-col gap-4 sm:flex-row sm:gap-10">
        <li className="hover:underline">
          <Link href="/about">
            <Text>About</Text>
          </Link>
        </li>
        <li className="hover:underline">
          <Link
            href="http://eepurl.com/htoWRr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text>Newsletter</Text>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="https://katharinaclasen.de">
            <Text>Katharina Clasen</Text>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="https://timoclasen.de">
            <Text>Timo Clasen</Text>
          </Link>
        </li>
      </ul>
      <ul className="flex flex-col space-y-4 font-bold sm:flex-row sm:space-y-0 sm:space-x-8">
        <li className="hover:underline">
          <Link href="/imprint">
            <Text>Imprint</Text>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/privacy">
            <Text>Privacy</Text>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
