import React from 'react';

import { Button } from '../Button';
import { Card } from '../Card';
import { Container } from '../Container';
import { Heading } from '../Heading';
import { Stack } from '../Stack';
import { Text } from '../Text';

export function NewsletterCard() {
  return (
    <Container as="section" width="768px">
      <div id="newsletter">
        <Card color="grass-normal">
          <Stack space="24px">
            <Heading as="h2" size="32px">
              News
            </Heading>
            <Text as="p">
              If you want to get updates, news, and information right into your
              inbox – please signup for our newsletter. You can also connect
              with us directly.
            </Text>
            <Button as="a" href="http://eepurl.com/htoWRr" target="_blank">
              Newsletter signup
            </Button>
          </Stack>
        </Card>
      </div>
    </Container>
  );
}
