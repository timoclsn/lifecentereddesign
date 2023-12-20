'use client';

import { action } from 'api/action';
import { Button } from 'design-system';
import { useAction } from 'lib/data/client';
import { ContentType } from 'lib/resources';

interface Props {
  collectionId: number;
  resourceId: number;
  resourceType: ContentType;
}

export const AddToThisCollectionButton = ({
  collectionId,
  resourceId,
  resourceType,
}: Props) => {
  const { runAction, isRunning } = useAction(
    action.collections.addToCollection,
  );
  return (
    <Button
      onClick={() => {
        runAction({
          collectionId,
          resourceId,
          resourceType,
        });
      }}
      disabled={isRunning}
    >
      Add to this collection
    </Button>
  );
};
