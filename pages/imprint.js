import ContentBlock from '@/components/ContentBlock';
import Heading from '@/components/Heading';
import Layout from '@/components/Layout';
import Stack from '@/components/Stack';
import Text from '@/components/Text';
import { getCO2Consumtion } from '@/lib/co2';

export default function Imprint(props) {
    return (
        <Layout co2Consumption={props.co2Consumption}>
            <ContentBlock size="medium">
                <Stack space="medium">
                    <Heading as="h1" size="large">
                        Imprint
                    </Heading>
                    <Stack space="small">
                        <Heading as="h3" size="small">
                            Information in accordance with Section 5 TMG
                        </Heading>
                        <Text as="p">
                            Katharina Clasen
                            <br />
                            Richard-Hirschmann-Str. 14/2
                            <br />
                            73728 Esslingen
                            <br />
                            Germany
                            <br />
                        </Text>
                        <p>
                            +49176 44484593
                            <br />
                            katharina@katharinaclasen.de
                        </p>
                    </Stack>
                    <Stack space="medium">
                        <Heading as="h2" size="medium">
                            Disclaimer
                        </Heading>
                        <Stack space="small">
                            <Heading as="h3" size="small">
                                Accountability for content
                            </Heading>
                            <Text as="p">
                                The contents of our pages have been created with
                                the utmost care. However, we cannot guarantee
                                the contents' accuracy, completeness or
                                topicality. According to statutory provisions,
                                we are furthermore responsible for our own
                                content on these web pages. In this matter,
                                please note that we are not obliged to monitor
                                the transmitted or saved information of third
                                parties, or investigate circumstances pointing
                                to illegal activity. Our obligations to remove
                                or block the use of information under generally
                                applicable laws remain unaffected by this as per
                                §§ 8 to 10 of the Telemedia Act (TMG).
                            </Text>
                        </Stack>
                        <Stack space="small">
                            <Heading as="h3" size="small">
                                Accountability for links
                            </Heading>
                            <Text as="p">
                                Responsibility for the content of external links
                                (to web pages of third parties) lies solely with
                                the operators of the linked pages. No violations
                                were evident to us at the time of linking.
                                Should any legal infringement become known to
                                us, we will remove the respective link
                                immediately.
                            </Text>
                        </Stack>
                        <Stack space="small">
                            <Heading as="h3" size="small">
                                Copyright
                            </Heading>
                            <Text as="p">
                                Our web pages and their contents are subject to
                                German copyright law. Unless expressly permitted
                                by law, every form of utilizing, reproducing or
                                processing works subject to copyright protection
                                on our web pages requires the prior consent of
                                the respective owner of the rights. Individual
                                reproductions of a work are only allowed for
                                private use. The materials from these pages are
                                copyrighted and any unauthorized use may violate
                                copyright laws.{' '}
                            </Text>
                            <Text as="p">
                                Quelle:{' '}
                                <a href="https://translate-24h.de">
                                    translate-24h.de - Das Übersetzungsbüro im
                                    Internet
                                </a>
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
            </ContentBlock>
        </Layout>
    );
}

export async function getStaticProps() {
    const co2Consumption = await getCO2Consumtion('https://timoclasen.de');

    return {
        props: { co2Consumption }
    };
}
