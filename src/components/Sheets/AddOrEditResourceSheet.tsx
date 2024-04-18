'use client';

import { action } from '@/api/action';
import { InfoBox } from '@/design-system';
import { useAction } from '@/lib/data/client';
import { sluggify } from '@/lib/utils/utils';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { DatePicker } from '@/ui/datepicker';
import { Input, InputError } from '@/ui/input';
import { Label } from '@/ui/label';
import MultiSelect from '@/ui/multiselect';
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
import { Textarea } from '@/ui/textarea';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { ReactNode, useRef, useState } from 'react';
import { AddCategorySheet } from './AddCategorySheet';
import { AddTopicSheet } from './AddTopicSheet';
import { AddTypeSheet } from './AddTypeSheet';

interface Props {
  children: ReactNode;
  onAdd?: () => void;
}

export const AddOrEditResourceSheet = ({ children, onAdd }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const { data: types, runAction: fetchTypes } = useAction(
    action.types.getTypes,
  );
  const { data: categories, runAction: fetchCategories } = useAction(
    action.categories.getCategories,
  );
  const { data: topics, runAction: fetchTopics } = useAction(
    action.topics.getTopics,
  );
  const { data: thoughtleaders, runAction: fetchThoughtleaders } = useAction(
    action.resources.getThoughtleaders,
  );
  const {
    runAction: addResource,
    isRunning: isAddResourceRunning,
    error: addResourceError,
    validationErrors: addResourceValidationErrors,
  } = useAction(action.resources.add, {
    onSuccess: () => {
      onAdd?.();
      onOpenChange(false);
      resetForm();
    },
  });
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [topicIds, setTopicIds] = useState<Array<string>>([]);
  const [thoughtleaderIds, setThoughtleaderIds] = useState<Array<string>>([]);
  const [date, setDate] = useState<Date>();

  const onOpenChange = (open: boolean) => {
    if (open) {
      fetchTypes();
      fetchCategories();
      fetchTopics();
      fetchThoughtleaders();
    } else {
      resetForm();
    }

    setOpen(open);
  };

  const resetForm = () => {
    formRef.current?.reset();
    setName('');
    setSlug('');
    setDate(undefined);
    setTopicIds([]);
    setThoughtleaderIds([]);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
          ref={formRef}
          action={(formData) => {
            console.log('formData', formData.get('type'));
            addResource({
              id: slug,
              name,
              suggestion: Boolean(formData.get('suggestion') === 'on'),
              link: String(formData.get('link')),
              typeId: Number(formData.get('type')),
              categoryId: Number(formData.get('category')),
              topicIds: topicIds.map(Number),
              description: String(formData.get('description')),
              details: String(formData.get('details')),
              note: String(formData.get('note')),
              date,
              datePlain: String(formData.get('datePlain')),
              creatorIds: thoughtleaderIds,
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
                  <Button variant="secondary">Add</Button>
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
                  <Button variant="secondary">Add</Button>
                </AddCategorySheet>
              </div>
              {addResourceValidationErrors?.categoryId && (
                <InputError>
                  {addResourceValidationErrors.categoryId[0]}
                </InputError>
              )}
            </div>

            {/* Topics */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="topics">Topics*</Label>
              <div className="flex gap-4">
                <MultiSelect
                  name="topics"
                  onValueChange={setTopicIds}
                  options={
                    topics?.map((topic) => ({
                      label: topic.name,
                      value: String(topic.id),
                    })) || []
                  }
                  placeholder="Select topics"
                />

                <AddTopicSheet onAdd={fetchTopics}>
                  <Button variant="secondary">Add</Button>
                </AddTopicSheet>
              </div>
              {addResourceValidationErrors?.topicIds && (
                <InputError>
                  {addResourceValidationErrors.topicIds[0]}
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
              {addResourceValidationErrors?.description && (
                <InputError>
                  {addResourceValidationErrors.description[0]}
                </InputError>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                placeholder="These are the details of the best resource ever."
                id="details"
                name="details"
              />
              {addResourceValidationErrors?.details && (
                <InputError>
                  {addResourceValidationErrors.details[0]}
                </InputError>
              )}
            </div>

            {/* Note */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">Note</Label>
              <Textarea
                placeholder="Thoughts from the editor."
                id="note"
                name="note"
              />
              {addResourceValidationErrors?.note && (
                <InputError>{addResourceValidationErrors.note[0]}</InputError>
              )}
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

            {/* Creators */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="creators">Creators</Label>
              <div className="flex gap-4">
                <MultiSelect
                  name="creators"
                  onValueChange={setThoughtleaderIds}
                  options={
                    thoughtleaders?.map((thoughtleader) => ({
                      label: thoughtleader.name,
                      value: thoughtleader.id,
                    })) || []
                  }
                  placeholder="Select creators"
                />

                <AddOrEditResourceSheet onAdd={fetchCategories}>
                  <Button variant="secondary">Add</Button>
                </AddOrEditResourceSheet>
              </div>
              {addResourceValidationErrors?.creatorIds && (
                <InputError>
                  {addResourceValidationErrors.creatorIds[0]}
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

            {addResourceError && (
              <InfoBox
                variant="error"
                icon={<AlertTriangle />}
                className="duration-150 ease-in-out animate-in fade-in zoom-in-50"
              >
                {addResourceError}
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
