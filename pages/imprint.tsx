import { GetStaticProps } from 'next';

import { Layout } from '../components/Layout';
import type { CO2 } from '../lib/co2';
import { getCO2Consumtion } from '../lib/co2';

export default function Imprint(props) {
    return (
        <Layout
            co2Consumption={props.co2Consumption}
            title="Imprint"
            slug="imprint">
            <section className="max-w-xl space-y-20">
                <h1 className="mb-6 text-5xl font-bold">Imprint</h1>
                <div className="space-y-4">
                    <h3 className="font-bold">
                        Information in accordance with Section 5 TMG
                    </h3>
                    <p>
                        Katharina Clasen
                        <br />
                        Richard-Hirschmann-Str. 14/2
                        <br />
                        73728 Esslingen
                        <br />
                        Germany
                        <br />
                    </p>
                    <p>
                        +49176 44484593
                        <br />
                        katharina@katharinaclasen.de
                    </p>
                </div>
                <div className="space-y-6">
                    <h2 className="mb-6 text-3xl font-bold">Disclaimer</h2>
                    <div className="space-y-4">
                        <h3 className="font-bold">
                            Accountability for content
                        </h3>
                        <p>
                            The contents of our pages have been created with the
                            utmost care. However, we cannot guarantee the
                            contents&apos; accuracy, completeness or topicality.
                            According to statutory provisions, we are
                            furthermore responsible for our own content on these
                            web pages. In this matter, please note that we are
                            not obliged to monitor the transmitted or saved
                            information of third parties, or investigate
                            circumstances pointing to illegal activity. Our
                            obligations to remove or block the use of
                            information under generally applicable laws remain
                            unaffected by this as per §§ 8 to 10 of the
                            Telemedia Act (TMG).
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold">Accountability for links</h3>
                        <p>
                            Responsibility for the content of external links (to
                            web pages of third parties) lies solely with the
                            operators of the linked pages. No violations were
                            evident to us at the time of linking. Should any
                            legal infringement become known to us, we will
                            remove the respective link immediately.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold">Copyright</h3>
                        <p>
                            Our web pages and their contents are subject to
                            German copyright law. Unless expressly permitted by
                            law, every form of utilizing, reproducing or
                            processing works subject to copyright protection on
                            our web pages requires the prior consent of the
                            respective owner of the rights. Individual
                            reproductions of a work are only allowed for private
                            use. The materials from these pages are copyrighted
                            and any unauthorized use may violate copyright laws.{' '}
                        </p>
                        <p>
                            Quelle:{' '}
                            <a href="https://translate-24h.de">
                                translate-24h.de - Das Übersetzungsbüro im
                                Internet
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const co2Consumption = await getCO2Consumtion(
        'https://lifecentereddesign.net'
    );

    return {
        props: { co2Consumption }
    };
};
