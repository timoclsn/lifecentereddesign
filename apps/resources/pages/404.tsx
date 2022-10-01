import { Text } from 'design-system';
import { Layout } from '../components/Layout';

export default function Error() {
  return (
    <Layout title="404 | Fehler" slug="404">
      <Text as="p" size="large">
        404 – Something went wrong.
      </Text>
    </Layout>
  );
}
