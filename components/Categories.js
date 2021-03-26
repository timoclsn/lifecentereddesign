import Button from '@/components/Button';
import Card from '@/components/Card';
import ContentBlock from '@/components/ContentBlock';
import Heading from '@/components/Heading';
import List from '@/components/List';
import MasonryGrid from '@/components/MasonryGrid';
import Stack from '@/components/Stack';
import Text from '@/components/Text';

export default function Categories() {
    return (
        <Stack as="section" space="xsmall">
            <Heading as="h3" size="small">
                What we plan to do here:
            </Heading>
            <MasonryGrid>
                <Card bgColor="bg-oak">
                    <Stack space="xsmall">
                        <Heading as="h3" size="small">
                            Information
                        </Heading>
                        <Text as="p">
                            We plan to provide you with theoretical and
                            practical information around life-centered design
                            through this website.
                        </Text>
                    </Stack>
                </Card>
                <Card bgColor="bg-grass">
                    <Stack space="xsmall">
                        <Heading as="h3" size="small">
                            Podcast
                        </Heading>
                        <Text as="p">
                            We are planning to host a podcast, where inspiring
                            guests would be interviewed around life-centered
                            design and related topics.
                        </Text>
                    </Stack>
                </Card>
                <Card bgColor="bg-sky">
                    <Stack space="xsmall">
                        <Heading as="h3" size="small">
                            Job Board
                        </Heading>
                        <Text as="p">
                            We are considering building a job board – a place
                            where you can find and offer jobs with a
                            life-centered design focus.
                        </Text>
                    </Stack>
                </Card>
                <Card bgColor="bg-morning">
                    <Stack space="xsmall">
                        <Heading as="h3" size="small">
                            News
                        </Heading>
                        <Text as="p">
                            Interesting news around the topic of life-centered
                            design – like new articles, upcoming events, book
                            releases, and more – are also supposed to be part of
                            Life Centered Design.Net
                        </Text>
                    </Stack>
                </Card>
                <Card bgColor="bg-evening">
                    <Stack space="xsmall">
                        <Heading as="h3" size="small">
                            Community
                        </Heading>
                        <Text as="p">
                            We consider creating a community, where everyone
                            interested in life-centered design can have
                            inspiring conversations, share best practices, and
                            co-create content around this fascinating topic.
                        </Text>
                    </Stack>
                </Card>
                <Card bgColor="bg-sand">
                    <Stack space="xsmall">
                        <Heading as="h3" size="small">
                            Resources
                        </Heading>
                        <Text as="p">
                            We would like to provide the visitors of this
                            website with helpful resources around life-centered
                            design and related fields. Included might be:
                        </Text>
                        <List>
                            <Text>Books</Text>
                            <Text>Podcasts/podcast episodes</Text>
                            <Text>Articles</Text>
                            <Text>Tools</Text>
                            <Text>And more…</Text>
                        </List>
                    </Stack>
                </Card>
                <Card bgColor="bg-forest">
                    <Stack space="xsmall">
                        <Heading as="h3" size="small">
                            Events
                        </Heading>
                        <Text as="p">
                            To bring the conversations around life-centered
                            design to life we would love to host events and make
                            them available through this website.
                        </Text>
                    </Stack>
                </Card>
            </MasonryGrid>
            <ContentBlock size="full">
                <ContentBlock size="medium">
                    <Stack align="center">
                        <Text align="center">
                            We are still evaluating these ideas and the general
                            concept. If you are interested, please signup for
                            our newsletter and consider letting us know what
                            ideas you like most.
                        </Text>
                        <Button
                            size="large"
                            href="http://eepurl.com/htoWRr"
                            target="_blank"
                            secondary
                            bgColor="bg-grass">
                            Newsletter signup
                        </Button>
                    </Stack>
                </ContentBlock>
            </ContentBlock>
        </Stack>
    );
}
