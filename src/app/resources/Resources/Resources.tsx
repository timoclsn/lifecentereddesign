import { Heading, Text } from '@/design-system';
import { SearchParams } from '@/lib/types';
import { z } from 'zod';
import { formateDate } from '../../../lib/utils/utils';
import { ResourcesTable } from './ResourcesTable/ResourcesTable';

export type ReseourcesFilter = z.infer<typeof reseourcesFilterSchema>;
const reseourcesFilterSchema = z.object({
  type: z.coerce.string().optional(),
  category: z.coerce.string().optional(),
  topic: z.coerce.string().optional(),
  sort: z.enum(['date', 'name', 'likes', 'comments']).optional(),
  search: z.string().optional(),
  liked: z.coerce.boolean().optional(),
  commented: z.coerce.boolean().optional(),
  from: z.string().optional(),
  till: z.string().optional(),
  limit: z.coerce.number().optional(),
  title: z.string().optional(),
});

interface Props {
  searchParams: SearchParams;
}

export const Resources = async ({ searchParams }: Props) => {
  const resourcesFilter = reseourcesFilterSchema.parse(searchParams);
  const { title, from, till } = resourcesFilter;

  const description = () => {
    if (from && till) {
      return `New resources added between ${formateDate(
        from,
      )} and ${formateDate(till)}:`;
    }

    if (from) {
      return `New resources added after ${formateDate(from)}:`;
    }

    if (till) {
      return `New resources added before ${formateDate(till)}:`;
    }

    return 'Have fun browsing all our resources on Life-centered Design and related topics:';
  };

  return (
    <section id="resources" className="flex flex-col gap-10">
      <div>
        <Heading level="1" className="mb-8 max-w-3xl">
          {title ? title : 'Resources'}
        </Heading>
        <Text as="p" size="large" className="max-w-5xl text-text-secondary">
          {description()}
        </Text>
      </div>
      <ResourcesTable reseourcesFilter={resourcesFilter} />
    </section>
  );
};
