import { AddCollectionDialog } from 'components/AddCollectionDialog/AddCollectionDialog';
import { AddToCollectionDialog } from 'components/AddToCollectionDialog/AddToCollectionDialog';
import { UpdateCollectionDialog } from 'components/UpdateCollectionDialog/UpdateCollectionDialog';
import { resourceTypes } from 'lib/resources';
import { SearchParams } from 'lib/types';
import { z } from 'zod';

const searchParamsSchema = z.object({
  dialog: z
    .enum(['add-to-collection', 'add-collection', 'update-collection'])
    .optional(),
  resourceId: z.coerce.number().optional(),
  resourceType: z.enum(resourceTypes).optional(),
  collectionId: z.coerce.number().optional(),
});

interface Props {
  searchParams: SearchParams;
}

export const ServerDialog = ({ searchParams }: Props) => {
  const { dialog, resourceId, resourceType, collectionId } =
    searchParamsSchema.parse(searchParams);

  if (dialog === 'add-to-collection' && resourceId && resourceType) {
    return (
      <AddToCollectionDialog
        resourceId={resourceId}
        resourceType={resourceType}
      />
    );
  } else if (dialog === 'add-collection') {
    return <AddCollectionDialog />;
  } else if (dialog === 'update-collection' && collectionId) {
    return <UpdateCollectionDialog collectionId={collectionId} />;
  }
  return null;
};
