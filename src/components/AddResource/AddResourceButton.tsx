import { query } from '@/api/query';
import { Await } from '@/components/Await/Await';
import { AddResourceSheet } from '@/components/AddResource/AddResourceSheet';
import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';

export const AddResourceButton = () => {
  const promise = query.users.isAdmin();
  return (
    <Await promise={promise}>
      {(isAdmin) => {
        if (!isAdmin) return null;

        return (
          <AddResourceSheet>
            <Button className="fixed bottom-4 right-4 z-10" size="icon">
              <Plus />
              <span className="sr-only">Add resource</span>
            </Button>
          </AddResourceSheet>
        );
      }}
    </Await>
  );
};
