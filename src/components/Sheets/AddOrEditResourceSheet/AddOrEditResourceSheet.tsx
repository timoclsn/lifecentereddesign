'use client';

import { action } from '@/api/action';
import { InfoBox } from '@/design-system';
import { useAction } from '@/lib/data/client';
import { Button } from '@/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
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
import { AddTypeSheet } from '../AddTypeSheet/AddTypeSheet';
import { InputError } from '@/ui/input';

interface Props {
  children: ReactNode;
}

export const AddOrEditResourceSheet = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const { data: types, runAction: fetchTypes } = useAction(
    action.types.getTypes,
  );
  const {
    runAction: addResource,
    isRunning: isAddResourceRunning,
    error,
    validationErrors: addResourceValidationErrors,
  } = useAction(action.resources.addResource, {
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  const onOpenChange = (open: boolean) => {
    if (open) {
      fetchTypes();
    }

    setOpen(open);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <form
          action={(formData) => {
            console.log('formData', formData.get('type'));
            addResource({
              typeId: Number(formData.get('type')),
            });
          }}
        >
          <SheetHeader>
            <SheetTitle>Add Resource</SheetTitle>
            <SheetDescription>
              Add a new resource to the list of resources.
            </SheetDescription>
          </SheetHeader>

          <div className="my-4 flex flex-col gap-4">
            {/* Type */}
            <div className="flex flex-col gap-1">
              <div className="flex gap-4">
                <Select name="type" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types?.map((type) => {
                      return (
                        <SelectItem key={type.id} value={String(type.id)}>
                          {type.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <AddTypeSheet onAdd={fetchTypes}>
                  <Button>Add type</Button>
                </AddTypeSheet>
              </div>
              {addResourceValidationErrors?.typeId && (
                <InputError>{addResourceValidationErrors.typeId[0]}</InputError>
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
              {isAddResourceRunning && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Add resource
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
