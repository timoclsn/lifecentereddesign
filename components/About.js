import ContentBlock from '@/components/ContentBlock';
import Heading from '@/components/Heading';
import NewsletterCard from '@/components/NewsletterCard';
import Stack from '@/components/Stack';
import Text from '@/components/Text';

export default function About() {
    return (
        <>
            <ContentBlock as="section" id="about" size="large">
                <Stack space="small">
                    <Heading as="h2" size="medium">
                        About Life Centered Design.Net
                    </Heading>
                    <Text as="p">
                        <strong>User-centered design</strong> (UCD) is an
                        approach for designing interactive systems that places
                        the users and their needs in the center of the design
                        process. It has been around for ages now, first gaining
                        popularity in 1986 through the book „User-Centered
                        System Design: New Perspectives on Human-Computer
                        Interaction“ by Donald A. Norman and Stephen W. Draper.
                    </Text>
                    <Text as="p">
                        The DIN EN ISO 9241-210, where this approach is defined,
                        is now using the term human-centered design (HCD) to
                        acknowledge, that there are several more stakeholders
                        who are affected by a product or service than just their
                        users.
                    </Text>
                    <Text as="p">
                        With that very same attitude, several questions can be
                        posed: Is it enough to focus the design around human
                        stakeholders? Are we the only ones affected by our
                        products? What about long-term effects – are we
                        considering them as well? Or effects that are more
                        indirect and might be hidden under the surface of
                        short-term user needs?
                    </Text>
                    <Text as="p">
                        In contrast to human-centered design, no ISO standard
                        defines life-centered design as a term and practice. The
                        notion of “life-centered design” is still in the
                        formation and I don’t feel like that there are a common
                        understanding and consense for what it means (yet) or if
                        that is the term to be used for what we want to express.
                        On top of that, there aren’t a lot of best practices for
                        a life-centered approach. Nevertheless, the questions
                        posed above seek to be answered. And life-centered
                        design is (at least for me) a term that fits well enough
                        to drive the conversation around these questions
                        further.
                    </Text>
                    <Text as="p">
                        That is why I want to create Life Centered Design.Net.
                        It is supposed to be a home for information, resources,
                        and conversations to evolve beyond human-centered and
                        user experience design.
                    </Text>
                </Stack>
            </ContentBlock>
            <ContentBlock as="section" id="newsletter" size="large">
                <NewsletterCard />
            </ContentBlock>
        </>
    );
}
