'use client';

import { action } from '@/api/action';
import { Resource } from '@/data/resources/query';
import { InfoBox } from '@/design-system';
import { useAction } from '@/lib/data/client';
import { sluggify } from '@/lib/utils/utils';
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/ui/sheet';
import { Textarea } from '@/ui/textarea';
import { useToast } from '@/ui/use-toast';
import { AlertTriangle, Info, Loader2, Plus, WandSparkles } from 'lucide-react';
import { ReactNode, useRef, useState } from 'react';
import { AddCategorySheet } from './AddCategorySheet';
import { AddTopicSheet } from './AddTopicSheet';
import { AddTypeSheet } from './AddTypeSheet';

interface Props {
  children: ReactNode;
  onAdd?: () => void;
  resource?: Resource;
}

export const AddOrEditResourceSheet = ({
  children,
  onAdd,
  resource,
}: Props) => {
  const isAddMode = !resource;
  const isEditMode = !isAddMode;

  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Inputs
  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const slugChanged = slug && slug !== resource?.slug;
  const [typeId, setTypeId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [topicIds, setTopicIds] = useState<Array<string>>([]);
  const [shortDescription, setShortDescription] = useState('');
  const [details, setDetails] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>();
  const [datePlain, setDatePlain] = useState('');
  const [relatedResourceIds, setRelatedrelatedResourceIds] = useState<
    Array<string>
  >([]);
  const [relatedResourcesPlain, setRelatedResourcesPlain] = useState('');
  const [suggestion, setSuggestion] = useState<boolean | 'indeterminate'>(
    false,
  );
  const [note, setNote] = useState('');

  // Actions

  // getTypes
  const { data: types, runAction: fetchTypes } = useAction(
    action.types.getTypes,
    {
      onError: ({ error }) => {
        toast({
          title: 'Error fetching types',
          description: error,
          variant: 'destructive',
        });
      },
    },
  );

  // getCategories
  const { data: categories, runAction: fetchCategories } = useAction(
    action.categories.getCategories,
    {
      onError: ({ error }) => {
        toast({
          title: 'Error fetching categories',
          description: error,
          variant: 'destructive',
        });
      },
    },
  );

  // getTopics
  const { data: topics, runAction: fetchTopics } = useAction(
    action.topics.getTopics,
    {
      onError: ({ error }) => {
        toast({
          title: 'Error fetching topics',
          description: error,
          variant: 'destructive',
        });
      },
    },
  );

  // getResources
  const { data: resources, runAction: fetchResources } = useAction(
    action.resources.getResources,
    {
      onError: ({ error }) => {
        toast({
          title: 'Error fetching resources',
          description: error,
          variant: 'destructive',
        });
      },
    },
  );

  // analizeLink
  const { runAction: analyzeLink, isRunning: isAnalyzeLinkRunning } = useAction(
    action.resources.analizeLink,
    {
      onSuccess: (data) => {
        if (!data) return;
        const {
          name,
          type,
          category,
          topics,
          shortDescription,
          description,
          date,
        } = data;

        setName(name);
        setSlug(sluggify(name));
        setTypeId(String(type));
        setCategoryId(String(category));
        setTopicIds(topics.map(String));
        setDescription(description);

        if (shortDescription) {
          setShortDescription(shortDescription);
        }

        if (date) {
          setDate(date);
        }

        toast({
          title: '✅ Succesfully analized link',
        });
      },
      onError: ({ error }) => {
        toast({
          title: 'Error analizing link',
          description: error,
          variant: 'destructive',
        });
      },
    },
  );

  // addResource
  const {
    runAction: addResource,
    isRunning: isAddResourceRunning,
    error: addResourceError,
    validationErrors: addResourceValidationErrors,
  } = useAction(action.resources.addResource, {
    onSuccess: () => {
      toast({
        title: '✅ Succesfully added resource',
      });
      onAdd?.();
      onOpenChange(false);
      resetForm();
    },
    onError: ({ error }) => {
      toast({
        title: 'Error adding resource',
        description: error,
        variant: 'destructive',
      });
    },
  });

  // editResource
  const {
    runAction: editResource,
    isRunning: isEditResourceRunning,
    error: editResourceError,
    validationErrors: editResourceValidationErrors,
  } = useAction(action.resources.editResource, {
    onSuccess: () => {
      toast({
        title: '✅ Succesfully edited resource',
      });
      onOpenChange(false);
      resetForm();
    },
    onError: ({ error }) => {
      toast({
        title: 'Error editing resource',
        description: error,
        variant: 'destructive',
      });
    },
  });

  // deleteResource
  const { runAction: deleteResource, isRunning: isDeleteResourceRunning } =
    useAction(action.resources.deleteResource, {
      onSuccess: () => {
        toast({
          title: '✅ Succesfully deleted resource',
        });
        onOpenChange(false);
        resetForm();
      },
      onError: ({ error }) => {
        toast({
          title: 'Error deleting resource',
          description: error,
          variant: 'destructive',
        });
      },
    });

  // revalidateCache
  const { runAction: revalidateCache, isRunning: isRevalidateCacheRunning } =
    useAction(action.cache.revalidateCache, {
      onSuccess: () => {
        toast({
          title: '✅ Succesfully revalidated cache',
        });
      },
      onError: ({ error }) => {
        toast({
          title: 'Error revalidating cache',
          description: error,
          variant: 'destructive',
        });
      },
    });

  const onOpenChange = (open: boolean) => {
    if (open) {
      if (isEditMode) {
        setUpForm(resource);
      }
      fetchTypes();
      fetchCategories();
      fetchTopics();
      fetchResources();
    } else {
      resetForm();
    }

    setOpen(open);
  };

  const setUpForm = (resource: Resource) => {
    setLink(resource.link);
    setName(resource.name);
    setSlug(resource.slug);
    setTypeId(String(resource.type.id));
    setCategoryId(String(resource.category.id));
    setTopicIds(resource.topics.map((topic) => String(topic.id)));
    setShortDescription(resource.shortDescription || '');
    setDescription(resource.description || '');
    setDetails(resource.details || '');
    setDate(resource.date || undefined);
    setDatePlain(resource.datePlain || '');
    setRelatedrelatedResourceIds(
      resource.relatedResources.map((resource) => String(resource.id)),
    );
    setRelatedResourcesPlain(resource.relatedResourcesPlain || '');
    setSuggestion(resource.suggestion);
    setNote(resource.note || '');
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
            if (isEditMode && !resource) return;
            const action = isAddMode ? addResource : editResource;
            action({
              id: isAddMode ? 0 : resource.id,
              link,
              name,
              slug,
              typeId: Number(typeId),
              categoryId: Number(categoryId),
              topicIds: topicIds.map(Number),
              shortDescription,
              description,
              details,
              date,
              datePlain,
              relatedResourceIds: relatedResourceIds.map(Number),
              relatedResourcesPlain,
              suggestion: suggestion === true,
              note,
            });
          }}
        >
          <SheetHeader>
            <SheetTitle>{isAddMode ? 'Add' : 'Edit'} Resource</SheetTitle>
            <SheetDescription>
              {isAddMode
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
                {isAddMode && (
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

            {isEditMode && slugChanged && (
              <InfoBox variant="info" icon={<Info />}>
                Consider adding a redirect when changing the slug!
              </InfoBox>
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
                        <SelectItem key={type.name} value={String(type.id)}>
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
                        <SelectItem
                          key={category.name}
                          value={String(category.id)}
                        >
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
                      value: String(topic.id),
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
                      value: String(resource.id),
                    })) || []
                  }
                  placeholder="Select related resources"
                />

                <AddOrEditResourceSheet onAdd={fetchCategories}>
                  <Button type="button" variant="secondary" size="icon">
                    <Plus />
                    <span className="sr-only">Add resource</span>
                  </Button>
                </AddOrEditResourceSheet>
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

            {/* Errors */}
            {addResourceError && (
              <InfoBox
                variant="error"
                icon={<AlertTriangle />}
                className="duration-150 ease-in-out animate-in fade-in zoom-in-50"
              >
                {addResourceError}
              </InfoBox>
            )}

            {editResourceError && (
              <InfoBox
                variant="error"
                icon={<AlertTriangle />}
                className="duration-150 ease-in-out animate-in fade-in zoom-in-50"
              >
                {editResourceError}
              </InfoBox>
            )}
          </div>

          <div className="flex justify-between gap-4">
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
              {isEditMode && (
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
                {isAddMode ? 'Add' : 'Edit'} resource
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
