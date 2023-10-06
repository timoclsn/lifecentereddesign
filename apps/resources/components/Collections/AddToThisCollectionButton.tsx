'use client';

import { addToCollection } from 'components/Collections/AddToCollectionDialog/actions';
import { Button } from 'design-system';
import { useAction } from 'lib/actions/useAction';
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
  const { runAction, isRunning } = useAction(addToCollection);
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