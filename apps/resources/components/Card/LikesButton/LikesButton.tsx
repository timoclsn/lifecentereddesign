import { ContentType } from 'lib/resources';
import { Suspense } from 'react';
import { LikesButtonServer } from './LikesButtonServer';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const LikesButton = ({ resourceId, resourceType }: Props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LikesButtonServer resourceId={resourceId} resourceType={resourceType} />
    </Suspense>
  );
};
