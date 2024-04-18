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
import { ReactNode, useRef, useState } from 'react';
import { AddTypeSheet } from '../AddTypeSheet/AddTypeSheet';
import { Input, InputError } from '@/ui/input';
import { Label } from '@/ui/label';
import { sluggify } from '@/lib/utils/utils';
import { Checkbox } from '@/ui/checkbox';
import { AddCategorySheet } from '../AddCategorySheet/AddCategorySheet';
import { Textarea } from '@/ui/textarea';
import { DatePicker } from '@/ui/datepicker';

interface Props {
  children: ReactNode;
}

export const AddOrEditResourceSheet = ({ children }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const { data: types, runAction: fetchTypes } = useAction(
    action.types.getTypes,
  );
  const { data: categories, runAction: fetchCategories } = useAction(
    action.categories.getCategories,
  );
  const {
    runAction: addResource,
    isRunning: isAddResourceRunning,
    error,
    validationErrors: addResourceValidationErrors,
  } = useAction(action.resources.add, {
    onSuccess: () => {
      onOpenChange(false);
      resetForm();
    },
  });
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [date, setDate] = useState<Date>();

  const onOpenChange = (open: boolean) => {
    if (open) {
      fetchTypes();
      fetchCategories();
    }

    setOpen(open);
  };

  const resetForm = () => {
    formRef.current?.reset();
    setName('');
    setSlug('');
    setDate(undefined);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <form
          ref={formRef}
          action={(formData) => {
            console.log('formData', formData.get('type'));
            addResource({
              id: String(formData.get('slug')),
              name: String(formData.get('name')),
              suggestion: Boolean(formData.get('suggestion') === 'on'),
              link: String(formData.get('link')),
              typeId: Number(formData.get('type')),
              categoryId: Number(formData.get('category')),
              description: String(formData.get('description')),
              details: String(formData.get('details')),
              note: String(formData.get('note')),
              date,
              datePlain: String(formData.get('datePlain')),
              creatorsPlain: String(formData.get('creatorsPlain')),
            });
          }}
        >
          <SheetHeader>
            <SheetTitle>Add Resource</SheetTitle>
            <SheetDescription>
              Add a new resource to the list of resources.
            </SheetDescription>
          </SheetHeader>

          <div className="my-8 flex flex-col gap-8">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name*</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="The best resource ever"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSlug(sluggify(e.target.value));
                }}
              />
              {addResourceValidationErrors?.name && (
                <InputError>{addResourceValidationErrors.name[0]}</InputError>
              )}
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Slug*</Label>
              <Input
                id="slug"
                name="slug"
                type="text"
                placeholder="the-best-resource-ever"
                required
                value={slug}
                onChange={(e) => setSlug(sluggify(e.target.value))}
              />
              {addResourceValidationErrors?.id && (
                <InputError>{addResourceValidationErrors.id[0]}</InputError>
              )}
            </div>

            {/* Suggestion */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="suggestion" name="suggestion" />
                <Label htmlFor="suggestion">Suggestion</Label>
              </div>
              {addResourceValidationErrors?.suggestion && (
                <InputError>
                  {addResourceValidationErrors.suggestion[0]}
                </InputError>
              )}
            </div>

            {/* Link */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Link*</Label>
              <Input
                id="link"
                name="link"
                type="url"
                placeholder="https://the-best-resource-ever.com"
                required
              />
              {addResourceValidationErrors?.link && (
                <InputError>{addResourceValidationErrors.link[0]}</InputError>
              )}
            </div>

            {/* Type */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Type*</Label>
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
                  <Button>Add</Button>
                </AddTypeSheet>
              </div>
              {addResourceValidationErrors?.typeId && (
                <InputError>{addResourceValidationErrors.typeId[0]}</InputError>
              )}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Category*</Label>
              <div className="flex gap-4">
                <Select name="category" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => {
                      return (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <AddCategorySheet onAdd={fetchCategories}>
                  <Button>Add</Button>
                </AddCategorySheet>
              </div>
              {addResourceValidationErrors?.categoryId && (
                <InputError>
                  {addResourceValidationErrors.categoryId[0]}
                </InputError>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="This is the best resource ever."
                id="description"
                name="description"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                placeholder="These are the details of the best resource ever."
                id="details"
                name="details"
              />
            </div>

            {/* Note */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">Note</Label>
              <Textarea
                placeholder="Thoughts from the editor."
                id="note"
                name="note"
              />
            </div>

            {/* Date */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="date">Date</Label>
              <DatePicker date={date} setDate={setDate} />
              {addResourceValidationErrors?.date && (
                <InputError>{addResourceValidationErrors.date[0]}</InputError>
              )}
            </div>

            {/* Date plain */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="datePlain">Date plain</Label>
              <Input
                id="datePlain"
                name="datePlain"
                type="text"
                placeholder="2020 - 2021"
              />
              {addResourceValidationErrors?.datePlain && (
                <InputError>
                  {addResourceValidationErrors.datePlain[0]}
                </InputError>
              )}
            </div>

            {/* Creators plain */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="creatorsPlain">Creators plain</Label>
              <Input
                id="creatorsPlain"
                name="creatorsPlain"
                type="text"
                placeholder="Katharina & Timo Clasen"
              />
              {addResourceValidationErrors?.creatorsPlain && (
                <InputError>
                  {addResourceValidationErrors.creatorsPlain[0]}
                </InputError>
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
