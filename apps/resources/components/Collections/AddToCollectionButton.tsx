'use client';

import { useServerDialog } from 'components/ServerDialog/useServerDialog';
import { Button } from 'design-system';
import { ContentType } from 'lib/resources';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const AddToCollectionButton = ({ resourceId, resourceType }: Props) => {
  const { openDialog, isPending } = useServerDialog();
  return (
    <Button
      onClick={() => {
        openDialog('add-to-collection', {
          resourceId,
          resourceType,
        });
      }}
      disabled={isPending}
    >
      Add to collection
    </Button>
  );
};
