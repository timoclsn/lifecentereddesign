import { query } from '@/api/query';
import { AddResourceSheet } from '@/components/AddResource/AddResourceSheet';
import { Await } from '@/components/Await/Await';
import { Resource } from '@/data/resources/query';
import { Button } from '@/ui/button';
import { Edit } from 'lucide-react';

interface Props {
  resource: Resource;
}

export const EditResourceButton = ({ resource }: Props) => {
  const promise = query.users.isAdmin();
  return (
    <Await promise={promise}>
      {(isAdmin) => {
        if (!isAdmin) return null;

        return (
          <AddResourceSheet resource={resource}>
            <Button className="fixed bottom-4 right-4" size="icon">
              <Edit />
              <span className="sr-only">Edit resource</span>
            </Button>
          </AddResourceSheet>
        );
      }}
    </Await>
  );
};
