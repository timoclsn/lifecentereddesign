import Button from '@/components/Button';

export default function Header() {
    return (
        <section className="max-w-xl">
            <h1 className="mb-6 text-3xl font-bold sm:text-5xl">
                Here you will soon find a hub for life-centered design
            </h1>
            <p className="mb-10 text-dark">
                This is supposed to be a home for information, news, resources,
                and conversations around life-centered design to evolve beyond
                human-centered and user experience design.
            </p>
            <Button
                text="I want to get updates"
                size="l"
                href="http://eepurl.com/htoWRr"
                target="_blank"
            />
        </section>
    );
}
