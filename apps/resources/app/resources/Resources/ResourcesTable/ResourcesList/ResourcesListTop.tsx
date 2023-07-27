'use client';

import { useResourcesTable } from '../ResourcesTableProvider';

export const ResourcesListTop = () => {
  const { resourcesTopRef } = useResourcesTable();
  return <div ref={resourcesTopRef} className="scroll-m-20" />;
};
