'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  Heading,
} from 'design-system';
import { ReactNode } from 'react';
import { AddToCollectionItem } from './AddToCollectionItem';
import { getData } from './actions';
import { AddCollectionDialog } from '../AddCollectionDialog/AddCollectionDialog';
import { ContentType } from 'data/resources/query';
import { useAction } from 'lib/data/client';

interface Props {
  children: ReactNode;
  resourceId: number;
  resourceType: ContentType;
}

export const AddToCollectionDialog = ({
  resourceId,
  resourceType,
  children,
}: Props) => {
  const { isRunning, data, error, runAction } = useAction(getData);

  const loadData = () => {
    runAction({
      resourceId,
      resourceType,
    });
  };

  const isLoading = isRunning && !data;

  return (
    <Dialog>
      <DialogTrigger onClick={loadData} asChild>
        {children}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Heading level="3">Add to Collection</Heading>
          {isLoading && <div>loading</div>}
          {error && <div>{error}</div>}
          {data && (
            <>
              <AddCollectionDialog goToCollection={false} onChange={loadData}>
                <Button>Add Collection</Button>
              </AddCollectionDialog>

              <ul className="flex flex-col gap-4">
                {data.map((collection) => {
                  return (
                    <li key={collection.id}>
                      <AddToCollectionItem
                        collectionId={collection.id}
                        collectionTitle={collection.title}
                        checked={collection.checked}
                        resourceId={resourceId}
                        resourceType={resourceType}
                        onChange={loadData}
                      />
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
