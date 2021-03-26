import Button from '@/components/Button';
import ContentBlock from '@/components/ContentBlock';
import Heading from '@/components/Heading';
import Stack from '@/components/Stack';
import Text from '@/components/Text';

export default function Header() {
    return (
        <ContentBlock as="section" size="medium" centered={false}>
            <Stack space="medium">
                <Stack space="small">
                    <Heading as="h1" size="large">
                        Here you will soon find a hub for life-centered design
                    </Heading>
                    <Text as="p">
                        This is supposed to be a home for information, news,
                        resources, and conversations around life-centered design
                        to evolve beyond human-centered and user experience
                        design.
                    </Text>
                </Stack>
                <Button
                    size="large"
                    href="http://eepurl.com/htoWRr"
                    target="_blank">
                    I want to get updates
                </Button>
            </Stack>
        </ContentBlock>
    );
}
