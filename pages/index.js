import Categories from '@/components/Categories';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import NewsletterCard from '@/components/NewsletterCard';
import ProfileCard from '@/components/ProfileCard';
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
                <NewsletterCard />
                <section className="flex flex-col items-center">
                    <div className="max-w-3xl mb-20">
                        <h2 className="mb-6 text-3xl font-bold">About us</h2>
                        <p className="mb-4 text-dark">
                            Hi{' '}
                            <span role="img" aria-label="Waveing hand">
                                👋
                            </span>
                        </p>

                        <p className="mb-4 text-dark">
                            This is Katharina. My husband Timo and I are the two
                            people behind Life Centered Design.Net.
                        </p>

                        <p className="mb-4 text-dark">
                            I have developed a passion for the mindset I
                            associate with life-centered design. I am trying to
                            weave in parts of this mindset into the things I do
                            as Head of Strategy & UX at Codeatelier, a lecturer
                            at Stuttgart Media University and University of
                            Applied Sciences Esslingen, and as a board member of
                            the Makers League e. V.
                        </p>

                        <p className="mb-4 text-dark">
                            My husband Timo, CEO at Codeatelier shares this
                            passion – especially when it comes to sustainability
                            in (web) technologies.
                        </p>

                        <p className="text-dark">
                            Because of my deep interest in that topic but also
                            due to the fact, that it was very hard for me to
                            find information and best practices on life-centered
                            design in the past years, I wanted to create Life
                            Centered Design.Net
                        </p>
                    </div>
                    <div className="flex flex-col max-w-3xl space-y-10 sm:space-y-0 sm:space-x-10 sm:flex-row">
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
