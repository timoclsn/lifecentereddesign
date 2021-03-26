import ContentBlock from '@/components/ContentBlock';
import Heading from '@/components/Heading';
import ProfileCard from '@/components/ProfileCard';
import Stack from '@/components/Stack';
import Text from '@/components/Text';

export default function AboutUs() {
    return (
        <>
            <ContentBlock as="section" size="large">
                <Stack space="large">
                    <Stack space="small">
                        <Heading as="h2" size="medium">
                            About us
                        </Heading>
                        <Text as="p">
                            Hi{' '}
                            <span role="img" aria-label="Waveing hand">
                                👋
                            </span>
                        </Text>
                        <Text as="p">
                            This is Katharina. My husband Timo and I are the two
                            people behind Life Centered Design.Net.
                        </Text>
                        <Text as="p">
                            I have developed a passion for the mindset I
                            associate with life-centered design. I am trying to
                            weave in parts of this mindset into the things I do
                            as Head of Strategy & UX at Codeatelier, a lecturer
                            at Stuttgart Media University and University of
                            Applied Sciences Esslingen, and as a board member of
                            the Makers League e. V.
                        </Text>
                        <Text as="p">
                            My husband Timo, CEO at Codeatelier shares this
                            passion – especially when it comes to sustainability
                            in (web) technologies.
                        </Text>
                        <Text as="p">
                            Because of my deep interest in that topic but also
                            due to the fact, that it was very hard for me to
                            find information and best practices on life-centered
                            design in the past years, I wanted to create Life
                            Centered Design.Net
                        </Text>
                    </Stack>
                    <Stack orientation="horizontal">
                        <div className="flex-1">
                            <ProfileCard
                                name="Katharina Clasen"
                                image="/profile/katha.png"
                                description="Head of Strategy & UX @ Codeatelier"
                                bgColor="bg-sky"
                                website="https://katharinaclasen.de"
                                linkedin="https://www.linkedin.com/in/katharina-clasen/"
                                instagram="https://www.instagram.com/katharinaclasen/"
                                twitter="https://twitter.com/KatharinaClasen"
                            />
                        </div>
                        <div className="flex-1">
                            <ProfileCard
                                name="Timo Clasen"
                                image="/profile/timo.png"
                                description="CEO @ Codeatelier"
                                bgColor="bg-evening"
                                website="https://timoclasen.de"
                                linkedin="https://www.linkedin.com/in/timoclsn"
                                twitter="https://twitter.com/timoclsn"
                            />
                        </div>
                    </Stack>
                </Stack>
            </ContentBlock>
        </>
    );
}
