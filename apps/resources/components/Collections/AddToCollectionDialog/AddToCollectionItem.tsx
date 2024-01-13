'use client';

import * as Checkbox from '@radix-ui/react-checkbox';
import { action } from 'api/action';
import { cva } from 'cva';
import { useAction } from 'lib/data/client';
import { ContentType } from 'lib/resources';
import { Check } from 'lucide-react';
import { useOptimistic } from 'react';

export const checkboxStyles = cva({
  base: 'flex size-[25px] items-center justify-center bg-ghost-main-dark-bg outline-none ring-inset flex-none',
  variants: {
    error: {
      true: 'ring-2 ring-red-700',
      false: 'focus-visible:ring-2 focus-visible:ring-ghost-contrast-text',
    },
  },
});

export const errorStyles =
  'absolute left-0 bottom-0 -mb-6 text-red-700 text-sm slide-in-from-top-full duration-100 ease-in-out fade-in animate-in';

type Checked = boolean | 'indeterminate';

interface Props {
  collectionId: number;
  collectionTitle: string;
  checked: Checked;
  resourceId: number;
  resourceType: ContentType;
  onChange?: () => void;
}

export const AddToCollectionItem = ({
  collectionId,
  collectionTitle,
  checked,
  resourceId,
  resourceType,
  onChange,
}: Props) => {
  const [optimisticChecked, updateOptimisticChecked] = useOptimistic(
    checked,
    (_, newState) => newState as Checked,
  );
  const { runAction: runAddToCollection, isRunning: addIsRunning } = useAction(
    action.collections.addToCollection,
    {
      onSettled: onChange,
    },
  );
  const { runAction: runRemoveFromCollection, isRunning: removeIsRunning } =
    useAction(action.collections.removeFromCollection, {
      onSettled: onChange,
    });
  const isRunning = addIsRunning || removeIsRunning;

  const onCheckedChange = async (checked: Checked) => {
    if (checked) {
      await runAddToCollection({
        collectionId,
        resourceId,
        resourceType,
      });
    } else {
      await runRemoveFromCollection({
        collectionId,
        resourceId,
        resourceType,
      });
    }

    updateOptimisticChecked(checked);
  };

  return (
    <div className="relative flex items-center gap-3">
      <Checkbox.Root
        id={collectionId.toString()}
        value={undefined}
        checked={optimisticChecked}
        onCheckedChange={onCheckedChange}
        className={checkboxStyles()}
        disabled={isRunning}
      >
        <span className="sr-only">Consens checkbox toggle button</span>
        <Checkbox.Indicator className="animate-in zoom-in-150 fade-in-50 duration-100">
          <Check />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="Label" htmlFor={collectionId.toString()}>
        {collectionTitle}
      </label>
    </div>
  );
};
