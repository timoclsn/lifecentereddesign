import { Text } from 'design-system';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found',
};

const NotFound = () => {
  return (
    <Text as="p" size="large">
      404 – Something went wrong.
    </Text>
  );
};

export default NotFound;
