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
import { AlertTriangle, Loader2, Plus, WandSparkles } from 'lucide-react';
import { ReactNode, useRef, useState } from 'react';
import { AddCategorySheet } from './AddCategorySheet';
import { AddTopicSheet } from './AddTopicSheet';
import { AddTypeSheet } from './AddTypeSheet';
import { useToast } from '@/ui/use-toast';
import { ToastAction } from '@/ui/toast';
import { Resource } from '@/data/resources/query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/ui/alert-dialog';

interface Props {
  children: ReactNode;
  onAdd?: () => void;
  resource?: Resource;
}

export const AddResourceSheet = ({ children, onAdd, resource }: Props) => {
  const mode = resource ? 'edit' : 'add';

  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const { data: types, runAction: fetchTypes } = useAction(
    action.types.getTypes,
  );
  const { data: categories, runAction: fetchCategories } = useAction(
    action.categories.getCategories,
  );
  const { data: topics, runAction: fetchTopics } = useAction(
    action.topics.getTopics,
  );
  const { data: resources, runAction: fetchResources } = useAction(
    action.resources.getResources,
  );
  const { runAction: analyzeLink, isRunning: isAnalyzeLinkRunning } = useAction(
    action.resources.analizeLink,
    {
      onSuccess: (data) => {
        if (!data) return;
        const { name, type, category, topics, description } = data;

        setName(name);
        setSlug(sluggify(name));
        setTypeId(String(type));
        setCategoryId(String(category));
        setTopicIds(topics.map(String));
        setDescription(description);

        toast({
          title: '✅ Succesfully analized link',
        });
      },
      onError: ({ error }) => {
        toast({
          title: '❌ Error analizing link',
          description: error,
          variant: 'destructive',
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => {
                analyzeLink({ link });
              }}
            >
              Try again
            </ToastAction>
          ),
        });
      },
    },
  );
  const {
    runAction: addResource,
    isRunning: isAddResourceRunning,
    error: addResourceError,
    validationErrors: addResourceValidationErrors,
  } = useAction(action.resources.addResource, {
    onSuccess: () => {
      onAdd?.();
      onOpenChange(false);
      resetForm();
    },
  });
  const {
    runAction: editResource,
    isRunning: isEditResourceRunning,
    error: editResourceError,
    validationErrors: editResourceValidationErrors,
  } = useAction(action.resources.editResource, {
    onSuccess: () => {
      onOpenChange(false);
      resetForm();
    },
  });
  const { runAction: deleteResource, isRunning: isDeleteResourceRunning } =
    useAction(action.resources.deleteResource, {
      onSuccess: () => {
        onOpenChange(false);
        resetForm();
      },
      onError: ({ error }) => {
        toast({
          title: `❌ ${error}`,
          variant: 'destructive',
        });
      },
    });
  const { runAction: revalidateCache, isRunning: isRevalidateCacheRunning } =
    useAction(action.cache.revalidateCache, {
      onSuccess: () => {
        toast({
          title: '✅ Succesfully revalidated cache',
        });
      },
      onError: ({ error }) => {
        toast({
          title: '❌ Error revalidateCache',
          description: error,
          variant: 'destructive',
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => {
                analyzeLink({ link });
              }}
            >
              Try again
            </ToastAction>
          ),
        });
      },
    });

  // Controlled inputs
  const [link, setLink] = useState(resource?.link || '');
  const [name, setName] = useState(resource?.name || '');
  const [slug, setSlug] = useState(resource?.id || '');
  const [typeId, setTypeId] = useState(resource?.type.name || '');
  const [categoryId, setCategoryId] = useState(resource?.category.name || '');
  const [topicIds, setTopicIds] = useState<Array<string>>(
    resource?.topics.map((topic) => topic.name) || [],
  );
  const [shortDescription, setShortDescription] = useState(
    resource?.shortDescription || '',
  );
  const [details, setDetails] = useState(resource?.details || '');
  const [description, setDescription] = useState(resource?.description || '');
  const [date, setDate] = useState<Date | undefined>(
    resource?.date ?? undefined,
  );
  const [datePlain, setDatePlain] = useState(resource?.datePlain || '');
  const [relatedResourceIds, setRelatedrelatedResourceIds] = useState<
    Array<string>
  >(
    resource?.relatedResources.map((relatedResource) => relatedResource.id) ||
      [],
  );
  const [relatedResourcesPlain, setRelatedResourcesPlain] = useState(
    resource?.relatedResourcesPlain || '',
  );
  const [suggestion, setSuggestion] = useState<boolean | 'indeterminate'>(
    resource?.suggestion || false,
  );
  const [note, setNote] = useState(resource?.note || '');

  const onOpenChange = (open: boolean) => {
    if (open) {
      fetchTypes();
      fetchCategories();
      fetchTopics();
      fetchResources();
    } else {
      resetForm();
    }

    setOpen(open);
  };

  const resetForm = () => {
    setLink('');
    setName('');
    setSlug('');
    setTypeId('');
    setCategoryId('');
    setTopicIds([]);
    setShortDescription('');
    setDescription('');
    setDetails('');
    setDate(undefined);
    setDatePlain('');
    setRelatedrelatedResourceIds([]);
    setRelatedResourcesPlain('');
    setSuggestion(false);
    setNote('');
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
          action={() => {
            const action = mode === 'add' ? addResource : editResource;
            action({
              link,
              name,
              id: mode === 'add' ? slug : resource?.id || '',
              typeId,
              categoryId,
              topicIds,
              shortDescription,
              description,
              details,
              date,
              datePlain,
              relatedResourceIds: relatedResourceIds,
              relatedResourcesPlain,
              suggestion: suggestion === true,
              note,
            });
          }}
        >
          <SheetHeader>
            <SheetTitle>{mode === 'add' ? 'Add' : 'Edit'} Resource</SheetTitle>
            <SheetDescription>
              {mode === 'add'
                ? 'Add a new resource to the list of resources.'
                : 'Edit the selected resource.'}
            </SheetDescription>
          </SheetHeader>

          <div className="my-8 flex flex-col gap-8">
            {/* Link */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Link*</Label>
              <div className="flex gap-4">
                <Input
                  id="link"
                  name="link"
                  type="url"
                  placeholder="https://the-best-resource-ever.com"
                  required
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                />
                {mode === 'add' && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={() => {
                      analyzeLink({
                        link,
                      });
                    }}
                    disabled={!link || isAnalyzeLinkRunning}
                  >
                    {isAnalyzeLinkRunning ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <WandSparkles />
                    )}
                    <span className="sr-only">Analyze link</span>
                  </Button>
                )}
              </div>
              {addResourceValidationErrors?.link && (
                <InputError>{addResourceValidationErrors.link[0]}</InputError>
              )}
              {editResourceValidationErrors?.link && (
                <InputError>{editResourceValidationErrors.link[0]}</InputError>
              )}
            </div>

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
              {editResourceValidationErrors?.name && (
                <InputError>{editResourceValidationErrors.name[0]}</InputError>
              )}
            </div>

            {/* Slug */}
            {mode === 'add' && (
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
                {editResourceValidationErrors?.id && (
                  <InputError>{editResourceValidationErrors.id[0]}</InputError>
                )}
              </div>
            )}

            {/* Type */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Type*</Label>
              <div className="flex gap-4">
                <Select
                  name="type"
                  required
                  value={typeId}
                  onValueChange={setTypeId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types?.map((type) => {
                      return (
                        <SelectItem key={type.name} value={type.name}>
                          {type.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <AddTypeSheet onAdd={fetchTypes}>
                  <Button type="button" variant="secondary" size="icon">
                    <Plus />
                    <span className="sr-only">Add type</span>
                  </Button>
                </AddTypeSheet>
              </div>
              {addResourceValidationErrors?.typeId && (
                <InputError>{addResourceValidationErrors.typeId[0]}</InputError>
              )}
              {editResourceValidationErrors?.typeId && (
                <InputError>
                  {editResourceValidationErrors.typeId[0]}
                </InputError>
              )}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Category*</Label>
              <div className="flex gap-4">
                <Select
                  name="category"
                  required
                  value={categoryId}
                  onValueChange={setCategoryId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => {
                      return (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <AddCategorySheet onAdd={fetchCategories}>
                  <Button type="button" variant="secondary" size="icon">
                    <Plus />
                    <span className="sr-only">Add type</span>
                  </Button>
                </AddCategorySheet>
              </div>
              {addResourceValidationErrors?.categoryId && (
                <InputError>
                  {addResourceValidationErrors.categoryId[0]}
                </InputError>
              )}
              {editResourceValidationErrors?.categoryId && (
                <InputError>
                  {editResourceValidationErrors.categoryId[0]}
                </InputError>
              )}
            </div>

            {/* Topics */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="topics">Topics*</Label>
              <div className="flex gap-4">
                <MultiSelect
                  name="topics"
                  value={topicIds}
                  onValueChange={setTopicIds}
                  options={
                    topics?.map((topic) => ({
                      label: topic.name,
                      value: topic.name,
                    })) || []
                  }
                  placeholder="Select topics"
                />

                <AddTopicSheet onAdd={fetchTopics}>
                  <Button type="button" variant="secondary" size="icon">
                    <Plus />
                    <span className="sr-only">Add type</span>
                  </Button>
                </AddTopicSheet>
              </div>
              {addResourceValidationErrors?.topicIds && (
                <InputError>
                  {addResourceValidationErrors.topicIds[0]}
                </InputError>
              )}
              {editResourceValidationErrors?.topicIds && (
                <InputError>
                  {editResourceValidationErrors.topicIds[0]}
                </InputError>
              )}
            </div>

            {/* Short Description */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Short Description</Label>
              <Input
                id="shortDescription"
                name="shortDescription"
                type="text"
                placeholder="UX Designer"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
              {addResourceValidationErrors?.shortDescription && (
                <InputError>
                  {addResourceValidationErrors.shortDescription[0]}
                </InputError>
              )}
              {editResourceValidationErrors?.shortDescription && (
                <InputError>
                  {editResourceValidationErrors.shortDescription[0]}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {addResourceValidationErrors?.description && (
                <InputError>
                  {addResourceValidationErrors.description[0]}
                </InputError>
              )}
              {editResourceValidationErrors?.description && (
                <InputError>
                  {editResourceValidationErrors.description[0]}
                </InputError>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                placeholder="ISBN: 978-3-16-148410-0 | Duration: 1h 30m"
                id="details"
                name="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
              {addResourceValidationErrors?.details && (
                <InputError>
                  {addResourceValidationErrors.details[0]}
                </InputError>
              )}
              {editResourceValidationErrors?.details && (
                <InputError>
                  {editResourceValidationErrors.details[0]}
                </InputError>
              )}
            </div>

            {/* Date */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="date">Date</Label>
              <DatePicker date={date} setDate={setDate} />
              {addResourceValidationErrors?.date && (
                <InputError>{addResourceValidationErrors.date[0]}</InputError>
              )}
              {editResourceValidationErrors?.date && (
                <InputError>{editResourceValidationErrors.date[0]}</InputError>
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
                value={datePlain}
                onChange={(e) => setDatePlain(e.target.value)}
              />
              {addResourceValidationErrors?.datePlain && (
                <InputError>
                  {addResourceValidationErrors.datePlain[0]}
                </InputError>
              )}
              {editResourceValidationErrors?.datePlain && (
                <InputError>
                  {editResourceValidationErrors.datePlain[0]}
                </InputError>
              )}
            </div>

            {/* RelatedResources */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="relatedResources">Related resources</Label>
              <div className="flex gap-4">
                <MultiSelect
                  name="relatedResources"
                  value={relatedResourceIds}
                  onValueChange={setRelatedrelatedResourceIds}
                  options={
                    resources?.map((resource) => ({
                      label: resource.name,
                      value: resource.id,
                    })) || []
                  }
                  placeholder="Select related resources"
                />

                <AddResourceSheet onAdd={fetchCategories}>
                  <Button type="button" variant="secondary" size="icon">
                    <Plus />
                    <span className="sr-only">Add resource</span>
                  </Button>
                </AddResourceSheet>
              </div>
              {addResourceValidationErrors?.relatedResourceIds && (
                <InputError>
                  {addResourceValidationErrors.relatedResourceIds[0]}
                </InputError>
              )}
              {editResourceValidationErrors?.relatedResourceIds && (
                <InputError>
                  {editResourceValidationErrors.relatedResourceIds[0]}
                </InputError>
              )}
            </div>

            {/* Related resources plain */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="relatedResourcesPlain">
                Related resources plain
              </Label>
              <Input
                id="relatedResourcesPlain"
                name="relatedResourcesPlain"
                type="text"
                placeholder="Katharina & Timo Clasen"
                value={relatedResourcesPlain}
                onChange={(e) => setRelatedResourcesPlain(e.target.value)}
              />
              {addResourceValidationErrors?.relatedResourcesPlain && (
                <InputError>
                  {addResourceValidationErrors.relatedResourcesPlain[0]}
                </InputError>
              )}
              {editResourceValidationErrors?.relatedResourcesPlain && (
                <InputError>
                  {editResourceValidationErrors.relatedResourcesPlain[0]}
                </InputError>
              )}
            </div>

            {/* Suggestion */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="suggestion"
                  name="suggestion"
                  checked={suggestion}
                  onCheckedChange={(checked) => setSuggestion(checked)}
                />
                <Label htmlFor="suggestion">Suggestion</Label>
              </div>
              {addResourceValidationErrors?.suggestion && (
                <InputError>
                  {addResourceValidationErrors.suggestion[0]}
                </InputError>
              )}
              {editResourceValidationErrors?.suggestion && (
                <InputError>
                  {editResourceValidationErrors.suggestion[0]}
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
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              {addResourceValidationErrors?.note && (
                <InputError>{addResourceValidationErrors.note[0]}</InputError>
              )}
              {editResourceValidationErrors?.note && (
                <InputError>{editResourceValidationErrors.note[0]}</InputError>
              )}
            </div>

            {(addResourceError || editResourceError) && (
              <InfoBox
                variant="error"
                icon={<AlertTriangle />}
                className="duration-150 ease-in-out animate-in fade-in zoom-in-50"
              >
                {addResourceError || editResourceError}
              </InfoBox>
            )}
          </div>

          <div className=" flex justify-between gap-4">
            <Button
              type="button"
              onClick={() => {
                revalidateCache();
              }}
              disabled={isRevalidateCacheRunning}
              variant="outline"
            >
              {isRevalidateCacheRunning && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Revalidate Cache
            </Button>
            <div className="flex gap-4">
              {resource && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={isDeleteResourceRunning}
                    >
                      {isDeleteResourceRunning && (
                        <Loader2 size={16} className="animate-spin" />
                      )}
                      Delete resource
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the resource.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          deleteResource({
                            id: resource?.id,
                          });
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              <Button
                type="submit"
                disabled={isAddResourceRunning || isEditResourceRunning}
              >
                {(isAddResourceRunning || isEditResourceRunning) && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                {mode === 'add' ? 'Add' : 'Edit'} resource
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
