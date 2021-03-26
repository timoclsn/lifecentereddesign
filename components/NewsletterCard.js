import Button from '@/components/Button';
import Card from '@/components/Card';
import Heading from '@/components/Heading';
import Stack from '@/components/Stack';
import Text from '@/components/Text';

export default function NewsletterCard() {
    return (
        <Card bgColor="bg-grass">
            <Stack space="medium">
                <Stack space="small">
                    <Heading as="h2" size="medium">
                        Interested?
                    </Heading>
                    <Text as="p">
                        If you want to get notified as soon as the Life Centered
                        Design Network goes live or get any other updates, news,
                        and information right into your inbox – please signup
                        for our newsletter.
                    </Text>
                </Stack>
                <Button
                    size="large"
                    href="http://eepurl.com/htoWRr"
                    target="_blank">
                    Newsletter signup
                </Button>
            </Stack>
        </Card>
    );
}
