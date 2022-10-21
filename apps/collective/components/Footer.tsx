import { Container } from 'design-system';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer>
      <Container inset className="py-6">
        <ul className="flex gap-10 justify-end">
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
