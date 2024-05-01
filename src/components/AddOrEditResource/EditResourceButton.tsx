import { query } from '@/api/query';
import { AddOrEditResourceSheet } from '@/components/AddOrEditResource/AddOrEditResourceSheet';
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
          <AddOrEditResourceSheet resource={resource}>
            <Button className="fixed bottom-4 right-4 z-10" size="icon">
              <Edit />
              <span className="sr-only">Edit resource</span>
            </Button>
          </AddOrEditResourceSheet>
        );
      }}
    </Await>
  );
};
