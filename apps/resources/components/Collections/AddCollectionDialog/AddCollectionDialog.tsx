'use client';

import { action } from 'api/action';
import { cva } from 'class-variance-authority';
import {
  Button,
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  Heading,
  InfoBox,
} from 'design-system';
import { useAction } from 'lib/data/client';
import { AlertTriangle, Loader2, MessageCircle } from 'lucide-react';
import { ReactNode, useState } from 'react';

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
  children: ReactNode;
  goToCollection?: boolean;
  onChange?: () => void;
}

export const AddCollectionDialog = ({
  children,
  goToCollection = true,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(false);
  const { error, validationErrors, runAction, isRunning } = useAction(
    action.collections.addCollection,
    {
      onSuccess: () => {
        setOpen(false);
      },
      onSettled: onChange,
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Heading level="3">Add Collection</Heading>
          <form
            action={(formData) => {
              runAction({
                title: String(formData.get('title')),
                description: String(formData.get('description')),
                goToCollection,
              });
            }}
          >
            {/* Title input */}
            <div className="relative mb-6 w-full">
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                id="title"
                name="title"
                aria-describedby="title-error"
                required
                placeholder="Title"
                type="text"
                className={inputStyles({ error: !!validationErrors?.title })}
              />
              {validationErrors?.title && (
                <div id="title-error" aria-live="polite">
                  <p className={errorStyles}>{validationErrors.title[0]}</p>
                </div>
              )}
            </div>

            {/* Description input */}
            <div className="relative mb-6 w-full">
              <label htmlFor="description" className="sr-only">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                aria-describedby="description-error"
                required
                placeholder="Description"
                rows={4}
                className={inputStyles({
                  error: !!validationErrors?.description,
                })}
              />
              {validationErrors?.description && (
                <div id="description-error" aria-live="polite">
                  <p className={errorStyles}>
                    {validationErrors.description[0]}
                  </p>
                </div>
              )}
            </div>

            {/* Submit button */}
            <Button type="submit" size="medium" disabled={isRunning}>
              {isRunning ? (
                <Loader2 className="animate-spin" />
              ) : (
                <MessageCircle />
              )}
              Add
            </Button>

            {/* Server messages */}
            {error && (
              <div aria-live="polite" role="status">
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
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
