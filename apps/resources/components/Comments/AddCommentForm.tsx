'use client';

import { cva } from 'class-variance-authority';
import { Button, InfoBox } from 'design-system';
import { AlertTriangle, Loader, MessageCircle } from 'lucide-react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useZodForm } from '../../hooks/useZodForm';
import { useAction } from '../../lib/actions/useAction';
import { ContentType } from '../../lib/resources';
import { addComment } from './actions';
import { textSchema } from './schemas';

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

export type AddCommentFormSchema = z.infer<typeof addCommentFormSchema>;

export const addCommentFormSchema = z.object({
  text: textSchema,
});

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const AddCommentForm = ({ resourceId, resourceType }: Props) => {
  const { error, runAction, isRunning } = useAction(addComment, {
    onSuccess: () => {
      reset();

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      splitbee.track('Comment Added');
    },
    onError: () => {
      setFocus('text', { shouldSelect: true });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setFocus,
  } = useZodForm({
    schema: addCommentFormSchema,
    defaultValues: {
      text: '',
    },
  });

  const onSubmit: SubmitHandler<AddCommentFormSchema> = async ({ text }) => {
    await runAction({
      id: resourceId,
      type: resourceType,
      text,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Text input */}
      <div className="relative mb-6 w-full">
        <label htmlFor="text" className="sr-only">
          Comment
        </label>
        <textarea
          id="text"
          placeholder="Post a comment…"
          rows={4}
          className={inputStyles({ error: !!errors.text })}
          {...register('text')}
        />
        {errors.text && <p className={errorStyles}>{errors.text.message}</p>}
      </div>
      {/* Submit button */}
      <Button type="submit" size="medium" disabled={isRunning}>
        {isRunning ? <Loader className="animate-spin" /> : <MessageCircle />}
        Post
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
