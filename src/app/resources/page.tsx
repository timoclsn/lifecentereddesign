import { SearchParams } from '@/lib/types';
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
    <>
      <Resources searchParams={searchParams} />
      <Suggestion />
    </>
  );
};

export default ResourcesPage;
