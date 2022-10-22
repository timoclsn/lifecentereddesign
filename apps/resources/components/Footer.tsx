import { Text } from 'design-system';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto flex justify-between gap-4 py-10 px-6 text-text-secondary sm:gap-10 sm:px-8 xl:px-10">
      <ul className="flex flex-col gap-4 sm:flex-row sm:gap-10">
        <li className="hover:underline">
          <Link href="/about">
            <a>
              <Text>About</Text>
            </a>
          </Link>
        </li>
        <li className="hover:underline">
          <a
            href="http://eepurl.com/htoWRr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text>Newsletter</Text>
          </a>
        </li>
        <li className="hover:underline">
          <a href="https://katharinaclasen.de">
            <Text>Katharina Clasen</Text>
          </a>
        </li>
        <li className="hover:underline">
          <a href="https://timoclasen.de">
            <Text>Timo Clasen</Text>
          </a>
        </li>
      </ul>
      <ul className="flex flex-col font-bold sm:flex-row gap-4 sm:gap-10">
        <li className="hover:underline">
          <Link href="/imprint">
            <a>
              <Text>Imprint</Text>
            </a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/privacy">
            <a>
              <Text>Privacy</Text>
            </a>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
