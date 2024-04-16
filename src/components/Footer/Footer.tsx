import { Text } from '@/components/design-system';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="text-text-secondary mt-20 flex justify-between gap-4 px-6 py-10 sm:mt-40 sm:gap-10 sm:px-8 xl:px-10">
      <ul className="flex flex-col gap-4 sm:flex-row sm:gap-10">
        <li className="hover:underline">
          <Link href="/#about">
            <Text>About</Text>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/#newsletter">
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
      <ul className="flex flex-col space-y-4 font-bold sm:flex-row sm:space-x-8 sm:space-y-0">
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
