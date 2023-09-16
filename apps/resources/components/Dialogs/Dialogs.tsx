import { AddToCollectionDialog } from 'components/AddToCollectionDialog/AddToCollectionDialog';
import { resourceTypes } from 'lib/resources';
import { z } from 'zod';

const searchParamsSchema = z.object({
  dialog: z.enum(['add-to-collection', 'add-collection']).optional(),
  resourceId: z.coerce.number().optional(),
  resourceType: z.enum(resourceTypes).optional(),
});

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export const Dialogs = ({ searchParams }: Props) => {
  const { dialog, resourceId, resourceType } =
    searchParamsSchema.parse(searchParams);

  if (dialog === 'add-to-collection' && resourceId && resourceType) {
    return (
      <AddToCollectionDialog
        resourceId={resourceId}
        resourceType={resourceType}
      />
    );
  }
  return null;
};
