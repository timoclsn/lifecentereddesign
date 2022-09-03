import Link from 'next/link';

export function Navigation() {
  return (
    <header className="flex items-center justify-between py-6 px-6 sm:px-8 xl:px-10">
      <ul className="flex w-full items-baseline gap-10">
        <li className="flex-1 font-serif text-2xl font-bold hover:underline">
          <Link href="/">
            <a>Life Centered Design.Net</a>
          </Link>
        </li>
        <li className="text-sm font-bold text-text-secondary hover:underline">
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li className="text-sm font-bold hover:underline">
          <Link href="/#new-resources">
            <a>Resources</a>
          </Link>
        </li>
      </ul>
    </header>
  );
}
