import { Heading, Text } from '@/design-system';
import { SearchParams } from '@/lib/types';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { formateDate } from '../../../lib/utils/utils';
import { AddResourceButton } from './AddResourceButton';
import { ResourcesTable } from './ResourcesTable/ResourcesTable';

export type ReseourcesFilter = z.infer<typeof reseourcesFilterSchema>;
const reseourcesFilterSchema = z.object({
  type: z.coerce.number().optional(),
  category: z.coerce.number().optional(),
  topic: z.coerce.number().optional(),
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

  const title = resourcesFilter.title;
  const from = resourcesFilter.from;
  const till = resourcesFilter.till;

  const user = auth();

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
        <div className="mb-8 flex items-center gap-2">
          <Heading level="1" className="max-w-3xl">
            {title ? title : 'Resources'}
          </Heading>
          {user.userId && <AddResourceButton />}
        </div>
        <Text as="p" size="large" className="max-w-5xl text-text-secondary">
          {description()}
        </Text>
      </div>
      <ResourcesTable reseourcesFilter={resourcesFilter} />
    </section>
  );
};
