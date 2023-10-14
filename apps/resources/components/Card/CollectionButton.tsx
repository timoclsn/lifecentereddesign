'use client';

import { AddToCollectionDialog } from 'components/Collections/AddToCollectionDialog/AddToCollectionDialog';
import { AddToThisCollectionButton } from 'components/Collections/AddToThisCollectionButton';
import { Button } from 'design-system';
import { ContentType } from 'lib/resources';
import { usePathname } from 'next/navigation';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const CollectionButton = ({ resourceId, resourceType }: Props) => {
  const pathname = usePathname();

  const collectionId = pathname.includes('/collections/')
    ? pathname.split('/').pop()
    : undefined;

  return (
    <div className="relative">
      {collectionId ? (
        <AddToThisCollectionButton
          collectionId={Number(collectionId)}
          resourceId={resourceId}
          resourceType={resourceType}
        />
      ) : (
        <AddToCollectionDialog
          resourceId={resourceId}
          resourceType={resourceType}
        >
          <Button>Add to collection</Button>
        </AddToCollectionDialog>
      )}
    </div>
  );
};
