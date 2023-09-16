'use client';

import * as Checkbox from '@radix-ui/react-checkbox';
import { cva } from 'class-variance-authority';
import { Collection } from 'database';
import { useAction } from 'lib/actions/useAction';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { addToCollection, removeFromCollection } from './actions';
import { ContentType } from 'lib/resources';
import { add } from 'date-fns';

export const checkboxStyles = cva(
  'flex h-[25px] w-[25px] items-center justify-center bg-ghost-main-dark-bg outline-none ring-inset flex-none',
  {
    variants: {
      error: {
        true: 'ring-2 ring-red-700',
        false: 'focus-visible:ring-2 focus-visible:ring-ghost-contrast-text',
      },
    },
  },
);

export const errorStyles =
  'absolute left-0 bottom-0 -mb-6 text-red-700 text-sm slide-in-from-top-full duration-100 ease-in-out fade-in animate-in';

interface Props {
  collection: Collection;
  initialState: boolean;
  resourceId: number;
  resourceType: ContentType;
}

export const AddToCollectionItem = ({
  collection,
  initialState,
  resourceId,
  resourceType,
}: Props) => {
  const { runAction: runAddToCollection, isRunning: addIsRunning } =
    useAction(addToCollection);
  const { runAction: runRemoveFromCollection, isRunning: removeIsRunning } =
    useAction(removeFromCollection);
  const isRunning = addIsRunning || removeIsRunning;
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(
    initialState,
  );

  const onCheckedChange = async (checked: boolean | 'indeterminate') => {
    if (checked) {
      await runAddToCollection({
        collectionId: collection.id,
        resourceId,
        resourceType,
      });
    } else {
      await runRemoveFromCollection({
        collectionId: collection.id,
        resourceId,
        resourceType,
      });
    }

    setChecked(checked);
  };

  return (
    <div className="relative flex items-center gap-3">
      <Checkbox.Root
        id={collection.id.toString()}
        value={undefined}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={checkboxStyles()}
        disabled={isRunning}
      >
        <span className="sr-only">Consens checkbox toggle button</span>
        <Checkbox.Indicator className="animate-in zoom-in-150 fade-in-50 duration-100">
          <Check />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="Label" htmlFor={collection.id.toString()}>
        {collection.title}
      </label>
    </div>
  );
};
