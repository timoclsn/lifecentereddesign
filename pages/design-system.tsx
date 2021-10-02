import { Card } from '../components/Card';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { Inline } from '../components/Inline';
import { Stack } from '../components/Stack';
import { Text } from '../components/Text';
import { Label } from '../components/Label';

export default function DesignSystem() {
  return (
    <Container as="section" inset="24px">
      <Stack>
        <Heading>Design System</Heading>
        <Text as="p">This is the test page for the new deisgn system.</Text>
        <Stack
          direction={{
            default: 'vertical',
            '640px': 'horizontal',
          }}
        >
          <Card>
            <Stack>
              <Heading size="16px">Card</Heading>
              <Text as="p">This is a Card</Text>
              <Inline>
                <Label>Label 1</Label>
                <Label>Label 2</Label>
                <Label>Label 3</Label>
                <Label>Label 4</Label>
              </Inline>
            </Stack>
          </Card>
          <Card>
            <Stack>
              <Heading size="16px">Card</Heading>
              <Text as="p">This is a Card</Text>
              <Inline>
                <Label>Label 1</Label>
                <Label>Label 2</Label>
                <Label>Label 3</Label>
                <Label>Label 4</Label>
              </Inline>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Container>
  );
}
