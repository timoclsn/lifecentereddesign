import { Container } from 'design-system';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer>
      <Container inset className="py-8">
        <ul className="flex items-center gap-10 justify-end">
          <li>
            <Link href="/privacy">Privacy</Link>
          </li>
          <li>
            <Link href="/imprint">Imprint</Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
};
