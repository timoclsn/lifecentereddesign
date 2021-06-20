import ProfileCard from '@/components/ProfileCard';

export default function AboutUs() {
    return (
        <section id="about-us" className="max-w-3xl mx-auto space-y-20">
            <div>
                <h2 className="mb-6 text-3xl font-bold">About us</h2>
                <div className="space-y-4 text-dark">
                    <p>
                        Hi{' '}
                        <span role="img" aria-label="Waveing hand">
                            👋
                        </span>
                    </p>
                    <p>
                        This is <strong>Katharina</strong>. My husband{' '}
                        <strong>Timo</strong> and I are the two people behind
                        Life Centered Design.Net.
                    </p>
                    <p>
                        I have developed a passion for the mindset I associate
                        with life-centered design. I am trying to weave in parts
                        of this mindset into the things I do as{' '}
                        <strong>Head of Strategy & UX</strong> at{' '}
                        <a
                            href="https://codeatelier.com"
                            className="underline"
                            target="_blank"
                            rel="noopener noreferrer">
                            Codeatelier
                        </a>
                        , a <strong>lecturer</strong> at{' '}
                        <a
                            href="https://www.hdm-stuttgart.de"
                            className="underline"
                            target="_blank"
                            rel="noopener noreferrer">
                            Stuttgart Media University
                        </a>{' '}
                        and{' '}
                        <a
                            href="https://www.hs-esslingen.de"
                            className="underline"
                            target="_blank"
                            rel="noopener noreferrer">
                            University of Applied Sciences Esslingen
                        </a>
                        , and as a <strong>board member</strong> of the{' '}
                        <a
                            href="https://makersleague.de"
                            className="underline"
                            target="_blank"
                            rel="noopener noreferrer">
                            Makers League e. V.
                        </a>
                    </p>
                    <p>
                        My husband Timo, <strong>CEO</strong> at{' '}
                        <a
                            href="https://codeatelier.com"
                            className="underline"
                            target="_blank"
                            rel="noopener noreferrer">
                            Codeatelier
                        </a>{' '}
                        shares this passion – especially when it comes to
                        sustainability in (web) technologies.
                    </p>
                    <p>
                        Because of my deep interest in that topic but also due
                        to the fact, that it was very hard for me to find
                        information and best practices on life-centered design
                        in the past years, I wanted to create Life Centered
                        Design.Net
                    </p>
                </div>
            </div>
            <div className="flex flex-col space-y-10 sm:space-y-0 sm:space-x-10 sm:flex-row">
                <ProfileCard
                    name="Katharina Clasen"
                    image="/profile/katharina-clasen.png"
                    job={{
                        role: 'Head of Strategy & UX',
                        name: 'Codeatelier',
                        url: 'https://codeatelier.com'
                    }}
                    bgColor="bg-sky"
                    website="https://katharinaclasen.de"
                    linkedin="https://www.linkedin.com/in/katharina-clasen/"
                    instagram="https://www.instagram.com/katharinaclasen/"
                    twitter="https://twitter.com/KatharinaClasen"
                />
                <ProfileCard
                    name="Timo Clasen"
                    image="/profile/timo-clasen.png"
                    job={{
                        role: 'CEO',
                        name: 'Codeatelier',
                        url: 'https://codeatelier.com'
                    }}
                    bgColor="bg-evening"
                    website="https://timoclasen.de"
                    linkedin="https://www.linkedin.com/in/timoclsn"
                    twitter="https://twitter.com/timoclsn"
                />
            </div>
        </section>
    );
}
