'use client';

import { AddToCollectionDialog } from 'components/Collections/AddToCollectionDialog/AddToCollectionDialog';
import { AddToThisCollectionButton } from 'components/Collections/AddToThisCollectionButton';
import { ContentType } from 'data/resources/query';
import { Button } from 'design-system';
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
