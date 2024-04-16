'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

interface Store {
  resourcesCountFinished: boolean;
}

const initialValues: Store = {
  resourcesCountFinished: false,
};

interface State {
  store: Store;
  setStorageValue: <T extends keyof Store>(key: T, value: Store[T]) => void;
}

const StorageContext = createContext<State | null>(null);

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const StorageProvider = ({ children }: Props) => {
  const [store, setStore] = useState<Store>(initialValues);

  const setStorageValue = <T extends keyof Store>(key: T, value: Store[T]) => {
    setStore((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <StorageContext.Provider value={{ store, setStorageValue }}>
      {children}
    </StorageContext.Provider>
  );
};
