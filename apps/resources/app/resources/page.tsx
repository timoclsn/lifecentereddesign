import { Page } from 'components/Page/Page';
import { SearchParams } from 'lib/types';
import { Metadata } from 'next';
import { z } from 'zod';
import { Resources } from './Resources/Resources';
import { Suggestion } from './Suggestion/Suggestion';

export const metadata: Metadata = {
  title: 'Resources',
};

export type ReseourcesFilter = z.infer<typeof reseourcesFilterSchema>;
const reseourcesFilterSchema = z.object({
  type: z.coerce.string().optional(),
  category: z.coerce.string().optional(),
  topic: z.coerce.string().optional(),
  sort: z.coerce.string().optional(),
  search: z.coerce.string().optional(),
  likes: z.coerce.boolean().optional(),
  comments: z.coerce.boolean().optional(),
  from: z.coerce.string().optional(),
  till: z.coerce.string().optional(),
  limit: z.coerce.number().optional(),
  title: z.coerce.string().optional(),
});

interface Props {
  searchParams: SearchParams;
}

const ResourcesPage = ({ searchParams }: Props) => {
  const resourcesFilter = reseourcesFilterSchema.parse(searchParams);
  return (
    <Page searchParams={searchParams}>
      <Resources resourcesFilter={resourcesFilter} />
      <Suggestion />
    </Page>
  );
};

export default ResourcesPage;
