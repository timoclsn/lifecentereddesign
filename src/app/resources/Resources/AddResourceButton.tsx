import { query } from '@/api/query';
import { Await } from '@/components/Await/Await';
import { AddOrEditResourceSheet } from '@/components/Sheets/AddOrEditResourceSheet/AddOrEditResourceSheet';
import { PlusCircle } from 'lucide-react';

export const AddResourceButton = () => {
  const promise = query.users.canEdit();
  return (
    <Await promise={promise}>
      {(canEdit) => {
        if (!canEdit) return null;

        return (
          <AddOrEditResourceSheet>
            <button>
              <PlusCircle size={32} />
            </button>
          </AddOrEditResourceSheet>
        );
      }}
    </Await>
  );
};
