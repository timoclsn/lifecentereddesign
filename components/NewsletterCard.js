import Button from '@/components/Button';

export default function NewsletterCard() {
    return (
        <section id="newsletter" className="flex flex-col items-center">
            <div className="max-w-3xl px-6 py-10 rounded-3xl bg-grass">
                <h2 className="mb-8 text-3xl font-bold">Interested?</h2>
                <p className="mb-10 text-dark">
                    If you want to get notified as soon as the Life Centered
                    Design Network goes live or get any other updates, news, and
                    information right into your inbox – please signup for our
                    newsletter.
                </p>
                <Button
                    text="Newsletter signup"
                    size="l"
                    href="http://eepurl.com/htoWRr"
                    target="_blank"
                />
            </div>
        </section>
    );
}
