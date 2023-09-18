import { Page } from 'components/Page/Page';
import { SearchParams } from 'lib/types';
import { Metadata } from 'next';
import { Resources } from './Resources/Resources';
import { Suggestion } from './Suggestion/Suggestion';

export const metadata: Metadata = {
  title: 'Resources',
};

interface Props {
  searchParams: SearchParams;
}

const ResourcesPage = ({ searchParams }: Props) => {
  return (
    <Page searchParams={searchParams}>
      <Resources searchParams={searchParams} />
      <Suggestion />
    </Page>
  );
};

export default ResourcesPage;
