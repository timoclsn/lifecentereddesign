import { ClerkProvider } from '@clerk/nextjs';
import { StorageProvider } from 'components/StorageProvider/StorageProvider';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <StorageProvider>{children}</StorageProvider>
    </ClerkProvider>
  );
};
