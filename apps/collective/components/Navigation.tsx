import { Container, Heading, Text } from 'design-system';
import Link from 'next/link';

export const Navigation = () => {
  return (
    <header>
      <Container inset className="py-8">
        <nav>
          <ul className="flex gap-10 items-center">
            <li className="flex-1">
              <Link href="/">
                <Heading as="span" level="4">
                  LCD Collective
                </Heading>
              </Link>
            </li>
            <li>
              <Link href="/#about">
                <Text>About us</Text>
              </Link>
            </li>
            <li>
              <Link href="/#principles">
                <Text>Principles</Text>
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
