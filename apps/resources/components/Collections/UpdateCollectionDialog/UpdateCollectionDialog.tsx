'use client';

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  Heading,
} from 'design-system';
import { useAction } from 'lib/serverActions/client';
import { ReactNode, useState } from 'react';
import { UpdateCollectionForm } from './UpdateCollectionForm';
import { getData } from './actions';

interface Props {
  children: ReactNode;
  collectionId: number;
}

export const UpdateCollectionDialog = ({ children, collectionId }: Props) => {
  const [open, setOpen] = useState(false);
  const { isRunning, data: collection, error, runAction } = useAction(getData);

  const isLoading = isRunning && !collection;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => {
          runAction({ collectionId });
        }}
        asChild
      >
        {children}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Heading level="3">Update Collection</Heading>
          {isLoading && <div>loading</div>}
          {error && <div>{error}</div>}
          {collection && (
            <UpdateCollectionForm
              collectionId={collectionId}
              title={collection.title}
              description={collection.description}
              onSuccess={() => {
                setOpen(false);
              }}
            />
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
