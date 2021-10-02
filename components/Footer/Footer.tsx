import React from 'react';
import Link from 'next/link';

import { Box } from '../Box';
import { Container } from '../Container';
import { Stack } from '../Stack';
import { Text } from '../Text';

export function Footer() {
  return (
    <Box as="footer" width="full" background="oak-normal" paddingY="48px">
      <Container inset="16px">
        <Stack direction="horizontal" justify="between">
          <Stack
            as="ul"
            direction={{ default: 'vertical', '640px': 'horizontal' }}
            space="32px"
          >
            <li>
              <Link href="/#about">
                <a>
                  <Text decoration={{ hover: 'underline' }}>About</Text>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#newsletter">
                <a>
                  <Text decoration={{ hover: 'underline' }}>Newsletter</Text>
                </a>
              </Link>
            </li>
            <li>
              <a href="https://katharinaclasen.de">
                <Text decoration={{ hover: 'underline' }}>
                  Katharina Clasen
                </Text>
              </a>
            </li>
            <li>
              <a href="https://timoclasen.de">
                <Text decoration={{ hover: 'underline' }}>Timo Clasen</Text>
              </a>
            </li>
          </Stack>
          <Stack
            as="ul"
            direction={{ default: 'vertical', '640px': 'horizontal' }}
            space="32px"
          >
            <li>
              <Link href="/imprint">
                <a>
                  <Text weight="bold" decoration={{ hover: 'underline' }}>
                    Imprint
                  </Text>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <a>
                  <Text weight="bold" decoration={{ hover: 'underline' }}>
                    Privacy
                  </Text>
                </a>
              </Link>
            </li>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
