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
              <Link href="/#about" passHref>
                <Box
                  as="a"
                  textDecoration={{
                    default: 'none',
                    hover: 'underline',
                  }}
                >
                  <Text>About</Text>
                </Box>
              </Link>
            </li>
            <li>
              <Link href="/#newsletter" passHref>
                <Box
                  as="a"
                  textDecoration={{
                    default: 'none',
                    hover: 'underline',
                  }}
                >
                  <Text>Newsletter</Text>
                </Box>
              </Link>
            </li>
            <li>
              <Box
                as="a"
                textDecoration={{
                  default: 'none',
                  hover: 'underline',
                }}
                href="https://katharinaclasen.de"
              >
                <Text>Katharina Clasen</Text>
              </Box>
            </li>
            <li>
              <Box
                as="a"
                textDecoration={{
                  default: 'none',
                  hover: 'underline',
                }}
                href="https://timoclasen.de"
              >
                <Text>Timo Clasen</Text>
              </Box>
            </li>
          </Stack>
          <Stack
            as="ul"
            direction={{ default: 'vertical', '640px': 'horizontal' }}
            space="32px"
          >
            <li>
              <Link href="/imprint" passHref>
                <Box
                  as="a"
                  textDecoration={{
                    default: 'none',
                    hover: 'underline',
                  }}
                >
                  <Text weight="bold">Imprint</Text>
                </Box>
              </Link>
            </li>
            <li>
              <Link href="/privacy" passHref>
                <Box
                  as="a"
                  textDecoration={{
                    default: 'none',
                    hover: 'underline',
                  }}
                >
                  <Text weight="bold">Privacy</Text>
                </Box>
              </Link>
            </li>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
