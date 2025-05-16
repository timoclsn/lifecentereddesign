import { SearchParams } from '@/lib/types';
import { Metadata } from 'next';
import { Resources } from './Resources/Resources';
import { Suggestion } from './Suggestion/Suggestion';

export const metadata: Metadata = {
  title: 'Resources',
};

interface Props {
  searchParams: Promise<SearchParams>;
}

const ResourcesPage = async ({ searchParams }: Props) => {
  const awaitedSearchParams = await searchParams;
  return (
    <>
      <Resources searchParams={awaitedSearchParams} />
      <Suggestion />
    </>
  );
};

export default ResourcesPage;
