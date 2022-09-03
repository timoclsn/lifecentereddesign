import { Button } from './Button';

export function NewsletterCard() {
  return (
    <section id="newsletter" className="flex flex-col items-center">
      <div className="max-w-3xl rounded-3xl bg-grass px-6 py-10">
        <h2 className="mb-8 text-3xl font-bold">Interested?</h2>
        <p className="mb-10 text-dark">
          If you want to get notified as soon as the Life Centered Design
          Network goes live or get any other updates, news, and information
          right into your inbox – please{' '}
          <a href="http://eepurl.com/htoWRr" className="underline">
            signup for our newsletter
          </a>
          .
        </p>
        <Button size="large" href="http://eepurl.com/htoWRr" target="_blank">
          Newsletter signup
        </Button>
      </div>
    </section>
  );
}
