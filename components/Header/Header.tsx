import React from 'react';

import { Box } from '../Box';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Stack } from '../Stack';
import { Text } from '../Text';

export function Header() {
  return (
    <Box as="section" maxWidth="640px">
      <Stack space="32px">
        <Heading>
          Here you will soon find a hub for life-centered design
        </Heading>
        <Text as="p">
          This is supposed to be a home for information, news, resources, and
          conversations around life-centered design to evolve beyond
          human-centered and user experience design.
        </Text>
        <Button as="a" href="http://eepurl.com/htoWRr" target="_blank">
          I want to get updates
        </Button>
      </Stack>
    </Box>
  );
}
