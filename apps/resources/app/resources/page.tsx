import { Suggestion } from 'components/Suggestion/Suggestion';
import { Resources } from './Resources';
import { z } from 'zod';

export type ReseourcesFilter = z.infer<typeof reseourcesFilterSchema>;
const reseourcesFilterSchema = z.object({
  type: z.coerce.string().optional(),
  category: z.coerce.string().optional(),
  topic: z.coerce.string().optional(),
  sort: z.coerce.string().optional(),
  search: z.coerce.string().optional(),
  likes: z.coerce.boolean().optional(),
  from: z.coerce.string().optional(),
  till: z.coerce.string().optional(),
});

interface Props {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const ResourcesPage = ({ searchParams }: Props) => {
  const resourcesFilter = reseourcesFilterSchema.parse(searchParams);
  return (
    <>
      <Resources resourcesFilter={resourcesFilter} />
      <Suggestion />
    </>
  );
};

export default ResourcesPage;
