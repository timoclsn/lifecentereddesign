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
                        This is Katharina. My husband Timo and I are the two
                        people behind Life Centered Design.Net.
                    </p>
                    <p>
                        I have developed a passion for the mindset I associate
                        with life-centered design. I am trying to weave in parts
                        of this mindset into the things I do as Head of Strategy
                        & UX at Codeatelier, a lecturer at Stuttgart Media
                        University and University of Applied Sciences Esslingen,
                        and as a board member of the Makers League e. V.
                    </p>
                    <p>
                        My husband Timo, CEO at Codeatelier shares this passion
                        – especially when it comes to sustainability in (web)
                        technologies.
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
    );
}
