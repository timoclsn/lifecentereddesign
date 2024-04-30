'use client';

import { action } from '@/api/action';
import { InfoBox } from '@/design-system';
import { useAction } from '@/lib/data/client';
import { Button } from '@/ui/button';
import { Input, InputError } from '@/ui/input';
import { Label } from '@/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/ui/sheet';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
  onAdd?: () => void;
}

export const AddTopicSheet = ({ children, onAdd }: Props) => {
  const [open, setOpen] = useState(false);
  const { runAction, isRunning, error, validationErrors } = useAction(
    action.topics.addTopic,
    {
      onSuccess: () => {
        onAdd?.();
        setOpen(false);
      },
    },
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <form
          action={(formData) => {
            runAction({
              name: String(formData.get('name')),
            });
          }}
        >
          <SheetHeader>
            <SheetTitle>Add topic</SheetTitle>
            <SheetDescription>Add a new resource topic.</SheetDescription>
          </SheetHeader>
          <div className="my-8 flex flex-col gap-8">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Sustainability"
                required
              />
              {validationErrors?.name && (
                <InputError>{validationErrors.name[0]}</InputError>
              )}
            </div>

            {error && (
              <InfoBox
                variant="error"
                icon={<AlertTriangle />}
                className="duration-150 ease-in-out animate-in fade-in zoom-in-50"
              >
                {error}
              </InfoBox>
            )}
          </div>
          <SheetFooter>
            <Button type="submit">
              {isRunning && <Loader2 size={16} className="animate-spin" />}
              Add topic
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
