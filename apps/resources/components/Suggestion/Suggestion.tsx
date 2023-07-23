import { ForrestSection } from 'components/ForrestSection/ForrestSection';
import { Heading, Text } from 'design-system';
import { SuggestionForm } from './SuggestionForm';
import { submit } from './actions';

export const Suggestion = () => {
  return (
    <ForrestSection id="suggestion">
      <Heading level="2" className="text-primary mb-6">
        Suggest Resource
      </Heading>
      <Text as="p" size="large" className="text-text-secondary mb-16">
        Surely there are a lot more great Life-centered Design resources out
        there. Help us discover and share them all! If we are missing something,
        just submit the resource and we&apos;ll review it and get it on the site
        as soon as possible.
      </Text>

      <SuggestionForm submit={submit} />
    </ForrestSection>
  );
};
