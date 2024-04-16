'use client';

import { action } from '@/api/action';
import { cva } from 'cva';
import { Button, InfoBox } from '@/components/design-system';
import { useAction } from '@/lib/data/client';
import { track } from '@/lib/tracking';
import { AlertTriangle, Loader2, MessageCircle } from 'lucide-react';
import { useRef } from 'react';

const inputStyles = cva({
  base: 'px-8 py-4 text-base text-text-secondary bg-ghost-main-dark-bg outline-none w-full ring-inset',
  variants: {
    error: {
      true: 'ring-2 ring-red-700',
      false: 'focus-visible:ring-2 focus-visible:ring-ghost-contrast-text',
    },
  },
});

const errorStyles =
  'absolute left-0 bottom-0 -mb-4 text-red-700 text-sm slide-in-from-top-full duration-100 ease-in-out fade-in animate-in';

interface Props {
  id: string;
}

export const AddCommentForm = ({ id }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const { error, validationErrors, runAction, isRunning } = useAction(
    action.resources.addComment,
    {
      onSuccess: () => {
        formRef.current?.reset();

        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }

        track('Comment Added', { id });
      },
      onError: () => {
        if (!textInputRef.current) return;
        textInputRef.current.focus();
        textInputRef.current.setSelectionRange(
          0,
          textInputRef.current.value.length,
        );
      },
    },
  );

  return (
    <form
      id="add-comment-form"
      ref={formRef}
      action={(formData) => {
        runAction({
          id,
          text: String(formData.get('text')),
        });
      }}
    >
      {/* Text input */}
      <div className="relative mb-6 w-full">
        <label htmlFor="text" className="sr-only">
          Comment
        </label>
        <textarea
          id="text"
          name="text"
          ref={textInputRef}
          required
          placeholder="Post a comment…"
          rows={4}
          className={inputStyles({ error: !!validationErrors?.text })}
        />
        {validationErrors?.text && (
          <div id="email-error" aria-live="polite">
            <p className={errorStyles}>{validationErrors.text[0]}</p>
          </div>
        )}
      </div>
      {/* Submit button */}
      <Button type="submit" size="medium" disabled={isRunning}>
        {isRunning ? <Loader2 className="animate-spin" /> : <MessageCircle />}
        Post
      </Button>

      {/* Server messages */}
      {error && (
        <div aria-live="polite" role="status" className="w-full">
          <InfoBox
            variant="error"
            icon={<AlertTriangle />}
            className="animate-in zoom-in-50 fade-in duration-150 ease-in-out"
          >
            {error}
          </InfoBox>
        </div>
      )}
    </form>
  );
};
