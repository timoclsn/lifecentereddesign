import { Container, Heading, Text } from 'design-system';
import Link from 'next/link';

export const Navigation = () => {
  return (
    <Container inset>
      <header className="w-full py-6">
        <nav>
          <ul className="flex gap-10">
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
                <Text>LCD Principles</Text>
              </Link>
            </li>
            <li>
              <Link href="/">
                <Text weight="bold">Join us</Text>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </Container>
  );
};
