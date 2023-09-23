'use client';

import { AddToCollectionButton } from 'components/Collections/AddToCollectionButton';
import { AddToThisCollectionButton } from 'components/Collections/AddToThisCollectionButton';
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
        <AddToCollectionButton
          resourceId={resourceId}
          resourceType={resourceType}
        />
      )}
    </div>
  );
};
