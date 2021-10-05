import React from 'react';
import Link from 'next/link';

import type { CO2 } from '../../lib/co2';
import { Container } from '../Container';
import { CO2Badge } from '../CO2Badge';
import { Box } from '../Box';
import { Stack } from '../Stack';
import { Text } from '../Text';

interface Props {
  co2Consumption: CO2;
}

export function Navigation({ co2Consumption }: Props) {
  return (
    <Box as="header" width="full">
      <Container as="nav" inset="16px">
        <Stack space="48px">
          <Box width="full" display="flex" justifyContent="center">
            <CO2Badge co2Consumption={co2Consumption} />
          </Box>
          <Stack as="ul" direction="horizontal" space="32px">
            <li>
              <Link href="/" passHref>
                <Box as="a" textDecoration="none" cursor="pointer">
                  <Text
                    as="h1"
                    weight="bold"
                    decoration={{ hover: 'underline' }}
                  >
                    Life Centered Design.Net
                  </Text>
                </Box>
              </Link>
            </li>
            <li>
              <Link href="/#about" passHref>
                <Box as="a" textDecoration="none" cursor="pointer">
                  <Text decoration={{ hover: 'underline' }}>About</Text>
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
                  cursor="pointer"
                >
                  <Text>Newsletter</Text>
                </Box>
              </Link>
            </li>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
