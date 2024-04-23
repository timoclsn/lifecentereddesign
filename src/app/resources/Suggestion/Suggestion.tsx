import { Heading, Text } from '@/design-system';
import { ForrestSection } from '../../../components/ForrestSection/ForrestSection';
import { SuggestionForm } from './SuggestionForm';

export const Suggestion = () => {
  return (
    <ForrestSection id="suggestion">
      <Heading level="2" className="text-primary mb-6">
        Suggest Resource
      </Heading>
      <Text as="p" size="large" className="mb-16 text-text-secondary">
        Surely there are a lot more great Life-centered Design resources out
        there. Help us discover and share them all! If we are missing something,
        just submit the resource and we&apos;ll review it and get it on the site
        as soon as possible.
      </Text>
      <SuggestionForm />
    </ForrestSection>
  );
};
