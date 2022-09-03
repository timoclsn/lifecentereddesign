import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto flex justify-between gap-4 p-10 text-text-secondary sm:gap-10">
      <ul className="flex flex-col gap-4 sm:flex-row sm:gap-10">
        <li className="hover:underline">
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li className="hover:underline">
          <a
            href="http://eepurl.com/htoWRr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Newsletter
          </a>
        </li>
        <li className="hover:underline">
          <a href="https://katharinaclasen.de">Katharina Clasen</a>
        </li>
        <li className="hover:underline">
          <a href="https://timoclasen.de">Timo Clasen</a>
        </li>
      </ul>
      <ul className="flex flex-col space-y-4 font-bold sm:flex-row sm:space-y-0 sm:space-x-8">
        <li className="hover:underline">
          <Link href="/imprint">
            <a>Imprint</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/privacy">
            <a>Privacy</a>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
