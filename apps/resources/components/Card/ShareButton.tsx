'use client';

import { Tag, Tooltip } from 'design-system';
import { track } from 'lib/tracking';
import { Check, Share } from 'lucide-react';
import { useState } from 'react';
import { getBaseUrl, wait } from '../../lib/utils/utils';
import { ContentType } from 'lib/resources';

interface Props {
  title: string;
  resourceId: number;
  resourceType: ContentType;
}

export const ShareButton = ({ title, resourceId, resourceType }: Props) => {
  const [copied, setCopied] = useState(false);

  const link = `${getBaseUrl()}/resources/${resourceType}-${resourceId}`;
  const text = 'Check out this resource I found on LifeCenteredDesign.Net 🌱';
  const tooltip = 'Share resource link';

  const handleClick = async () => {
    if (!navigator.share && !navigator.clipboard) return;

    if (navigator.share) {
      navigator.share({
        title,
        text,
        url: link,
      });
    } else {
      setCopied(true);
      navigator.clipboard.writeText(`${text} ${link}`);
      await wait(3000);
      setCopied(false);
    }

    track('Share Resource Link', {
      link,
    });
  };

  return (
    <Tooltip content={tooltip} delayDuration={500}>
      <button
        className="relative flex items-stretch hover:opacity-80"
        onClick={handleClick}
      >
        <Tag variant="dark">
          <div className="flex items-center gap-1 [&>svg]:h-[18px] [&>svg]:w-[18px]">
            {copied ? <Check /> : <Share />}
            <span className="sr-only">{tooltip}</span>
          </div>
        </Tag>
      </button>
    </Tooltip>
  );
};
