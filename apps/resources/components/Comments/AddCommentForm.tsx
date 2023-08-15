'use client';

import { Button } from 'design-system';
import { ContentType } from 'lib/resources';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { add } from './actions';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const AddCommentForm = ({ resourceId, resourceType }: Props) => {
  const [pending, startTransition] = useTransition();
  const { refresh } = useRouter();

  const handleSubmit = (formData: FormData) => {
    const text = formData.get('text');
    if (text) {
      startTransition(async () => {
        await add({
          id: resourceId,
          type: resourceType,
          text: text.toString(),
        });
        refresh();
      });
    }
  };
  return (
    <form action={handleSubmit}>
      <textarea name="text" />
      <Button type="submit" disabled={pending}>
        {pending ? 'Adding…' : 'Add Comment'}
      </Button>
    </form>
  );
};
