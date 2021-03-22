import Categories from '@/components/Categories';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { getCO2Consumtion } from '@/lib/co2';

export default function Home(props) {
    return (
        <Layout co2Consumption={props.co2Consumption}>
            <div className="space-y-28">
                <Header />
                <Categories />
                <section className="flex flex-col items-center">
                    <div className="max-w-3xl">
                        <h2 className="mb-6 text-3xl font-bold">
                            About Life Centered Design.Net
                        </h2>
                        <p className="mb-4 text-dark">
                            User-centered design (UCD) is an approach for
                            designing interactive systems that places the users
                            and their needs in the center of the design process.
                            It has been around for ages now, first gaining
                            popularity in 1986 through the book „User-Centered
                            System Design: New Perspectives on Human-Computer
                            Interaction“ by Donald A. Norman and Stephen W.
                            Draper.
                        </p>

                        <p className="mb-4text-dark">
                            The DIN EN ISO 9241-210, where this approach is
                            defined, is now using the term human-centered design
                            (HCD) to acknowledge, that there are several more
                            stakeholders who are affected by a product or
                            service than just their users.
                        </p>

                        <p className="mb-4 text-dark">
                            With that very same attitude, several questions can
                            be posed: Is it enough to focus the design around
                            human stakeholders? Are we the only ones affected by
                            our products? What about long-term effects – are we
                            considering them as well? Or effects that are more
                            indirect and might be hidden under the surface of
                            short-term user needs?
                        </p>

                        <p className="mb-4 text-dark">
                            In contrast to human-centered design, no ISO
                            standard defines life-centered design as a term and
                            practice. The notion of “life-centered design” is
                            still in the formation and I don’t feel like that
                            there are a common understanding and consense for
                            what it means (yet) or if that is the term to be
                            used for what we want to express. On top of that,
                            there aren’t a lot of best practices for a
                            life-centered approach. Nevertheless, the questions
                            posed above seek to be answered. And life-centered
                            design is (at least for me) a term that fits well
                            enough to drive the conversation around these
                            questions further.
                        </p>

                        <p className="text-dark">
                            That is why I want to create Life Centered
                            Design.Net. It is supposed to be a home for
                            information, resources, and conversations to evolve
                            beyond human-centered and user experience design.
                        </p>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    const co2Consumption = await getCO2Consumtion('https://timoclasen.de');

    return {
        props: { co2Consumption }
    };
}
