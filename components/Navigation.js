import Link from "next/link";

export default function Navigation() {
  return (
    <header>
      <span>Navigation: </span>
      <Link href="/">
        <a>
          <h1>Life Centered Design</h1>
        </a>
      </Link>
    </header>
  );
}
