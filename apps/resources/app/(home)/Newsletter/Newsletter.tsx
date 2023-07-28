import { Heading, Link, Text } from 'design-system';
import NextLink from 'next/link';
import { ForrestSection } from '../../../components/ForrestSection/ForrestSection';
import { NewsletterForm } from './NewsletterForm';

export const Newsletter = () => {
  return (
    <ForrestSection id="newsletter">
      <Heading level="2" className="text-primary mb-6">
        Newsletter
      </Heading>
      <Text as="p" size="large" className="text-text-secondary mb-16">
        Sign up for our Newsletter to get all the new resources and other
        Life-centered Design related news delivered to your inbox once a month.
      </Text>
      <NewsletterForm />

      {/* Info text */}
      <div className=" mx-auto mb-40 mt-10 max-w-prose">
        <Text as="p" size="small" className="text-text-secondary">
          By subscribing to our newsletter you also give us your consent that we
          analyze, track and store the opening- and click-rates to optimize our
          newsletter and services. You can unsubscribe at any time by clicking
          the link in the footer of our emails. We use the newsletter provider
          Mailchimp. For detailed information about our privacy practices,
          please visit our{' '}
          <Link as={NextLink} url="/privacy">
            privacy policy
          </Link>
          . Learn more about Mailchimp&apos;s privacy practices{' '}
          <Link url="https://mailchimp.com/legal/terms" external>
            here.
          </Link>
        </Text>
      </div>
    </ForrestSection>
  );
};
