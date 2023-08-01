import { Share } from 'lucide-react';
import { ContentType } from '../../lib/resources';
import { getBaseUrl } from '../../lib/utils';
import { CopyButton } from './CopyButton';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const CopyShareLink = ({ resourceId, resourceType }: Props) => {
  return (
    <CopyButton
      link={`${getBaseUrl()}/resources/${resourceType}-${resourceId}`}
      tooltip="Copy share link"
    >
      <Share />
    </CopyButton>
  );
};
