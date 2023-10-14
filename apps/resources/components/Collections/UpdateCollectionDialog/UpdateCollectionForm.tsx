'use client';

import { cva } from 'class-variance-authority';
import {
  AddCollectionSchema,
  addCollectionSchema,
} from 'components/Collections/AddCollectionDialog/schemas';
import { Button, InfoBox } from 'design-system';
import { useZodForm } from 'hooks/useZodForm';
import { useAction } from 'lib/serverActions/client';
import { AlertTriangle, Loader2, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { updateCollection } from './actions';

const inputStyles = cva(
  'px-8 py-4 text-base text-text-secondary bg-ghost-main-dark-bg outline-none w-full ring-inset',
  {
    variants: {
      error: {
        true: 'ring-2 ring-red-700',
        false: 'focus-visible:ring-2 focus-visible:ring-ghost-contrast-text',
      },
    },
  },
);

const errorStyles =
  'absolute left-0 bottom-0 -mb-4 text-red-700 text-sm slide-in-from-top-full duration-100 ease-in-out fade-in animate-in';

interface Props {
  collectionId: number;
  title: string;
  description: string;
  onSuccess?: () => void;
}

export const UpdateCollectionForm = ({
  collectionId,
  title,
  description,
  onSuccess,
}: Props) => {
  const { back } = useRouter();
  const { error, runAction, isRunning } = useAction(updateCollection, {
    onSuccess: () => {
      onSuccess?.();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm({
    schema: addCollectionSchema,
    defaultValues: {
      title,
      description,
    },
  });

  const onSubmit: SubmitHandler<AddCollectionSchema> = async ({
    title,
    description,
  }) => {
    await runAction({
      collectionId,
      title,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title input */}
      <div className="relative mb-6 w-full">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          id="title"
          placeholder="Title"
          type="text"
          className={inputStyles({ error: !!errors.title })}
          {...register('title')}
        />
        {errors.title && <p className={errorStyles}>{errors.title.message}</p>}
      </div>

      {/* Description input */}
      <div className="relative mb-6 w-full">
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Description"
          rows={4}
          className={inputStyles({ error: !!errors.description })}
          {...register('description')}
        />
        {errors.description && (
          <p className={errorStyles}>{errors.description.message}</p>
        )}
      </div>

      {/* Submit button */}
      <Button type="submit" size="medium" disabled={isRunning}>
        {isRunning ? <Loader2 className="animate-spin" /> : <MessageCircle />}
        Update
      </Button>

      {/* Server messages */}
      {error && (
        <InfoBox
          variant="error"
          icon={<AlertTriangle />}
          className="animate-in zoom-in-50 fade-in duration-150 ease-in-out"
        >
          {error}
        </InfoBox>
      )}
    </form>
  );
};