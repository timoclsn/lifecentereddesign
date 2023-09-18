'use client';

import { addToCollection } from 'components/AddToCollectionDialog/actions';
import { OpenServerDialog } from 'components/ServerDialog/OpenServerDialog';
import { Button } from 'design-system';
import { useAction } from 'lib/actions/useAction';
import { ContentType } from 'lib/resources';
import { usePathname } from 'next/navigation';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const CollectionButton = ({ resourceId, resourceType }: Props) => {
  const { runAction, isRunning } = useAction(addToCollection);
  const pathname = usePathname();
  const collectionId = pathname.includes('/collections/')
    ? pathname.split('/').pop()
    : undefined;

  return collectionId ? (
    <Button
      className="relative"
      onClick={() => {
        runAction({
          collectionId: Number(collectionId),
          resourceId,
          resourceType,
        });
      }}
      disabled={isRunning}
    >
      Add to this collection
    </Button>
  ) : (
    <OpenServerDialog
      dialog="add-to-collection"
      params={{ resourceId, resourceType }}
      className="relative"
    >
      Add to Collection
    </OpenServerDialog>
  );
};
