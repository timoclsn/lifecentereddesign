import { query } from '@/api/query';
import { Await } from '@/components/Await/Await';
import { AddOrEditResourceSheet } from '@/components/AddOrEditResource/AddOrEditResourceSheet';
import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';

export const AddResourceButton = () => {
  const promise = query.users.isAdmin();
  return (
    <Await promise={promise}>
      {(isAdmin) => {
        if (!isAdmin) return null;

        return (
          <AddOrEditResourceSheet>
            <Button className="fixed bottom-4 right-4 z-10" size="icon">
              <Plus />
              <span className="sr-only">Add resource</span>
            </Button>
          </AddOrEditResourceSheet>
        );
      }}
    </Await>
  );
};
