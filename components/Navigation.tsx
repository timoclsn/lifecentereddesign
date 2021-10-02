import Link from 'next/link';

import type { CO2 } from '../lib/co2';
import { Container } from './Container';
import { CO2Badge } from './CO2Badge';
import { Box } from './Box';
import { Stack } from './Stack';
import { Text } from './Text';

interface Props {
  co2Consumption: CO2;
}

export function Navigation({ co2Consumption }: Props) {
  return (
    <Box as="header" width="full">
      <Container as="nav">
        <Stack space="2xl">
          <Box width="full" display="flex" justifyContent="center">
            <CO2Badge co2Consumption={co2Consumption} />
          </Box>
          <Stack as="ul" direction="horizontal" space="xl">
            <li>
              <Link href="/">
                <a>
                  <Text
                    as="h1"
                    weight="bold"
                    decoration={{ hover: 'underline' }}
                  >
                    Life Centered Design.Net
                  </Text>
                </a>
              </Link>
            </li>
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
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
