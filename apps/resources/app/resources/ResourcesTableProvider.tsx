'use client';

import { ReactNode, RefObject, createContext, useContext, useRef } from 'react';

interface State {
  scrollToTop: () => void;
  resourcesTopRef: RefObject<HTMLDivElement>;
}

const initalState: State = {
  scrollToTop: () => {},
  resourcesTopRef: {
    current: null,
  },
};

const ResourcesTableContext = createContext<State>(initalState);

export const useResourcesTable = () => {
  const context = useContext(ResourcesTableContext);
  if (!context) {
    throw new Error(
      'useResourcesTable must be used within a ResourcesTableProvider'
    );
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const ResourcesTableProvider = ({ children }: Props) => {
  const resourcesTopRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    resourcesTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ResourcesTableContext.Provider
      value={{
        resourcesTopRef,
        scrollToTop,
      }}
    >
      {children}
    </ResourcesTableContext.Provider>
  );
};
