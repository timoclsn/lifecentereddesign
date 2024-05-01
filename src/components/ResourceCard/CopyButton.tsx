'use client';

import { Tag, Tooltip } from '@/design-system';
import { track } from '@/lib/tracking';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { wait } from '../../lib/utils/utils';
import { Resource } from '@/data/resources/query';

interface Props {
  id: Resource['id'];
  link: Resource['link'];
}

export const CopyButton = ({ id, link }: Props) => {
  const [copied, setCopied] = useState(false);
  const tooltip = 'Copy resource link';

  const handleClick = async () => {
    if (!navigator.clipboard) return;
    setCopied(true);
    navigator.clipboard.writeText(link);
    track('Copy Resource Link', { id, link });
    await wait(3000);
    setCopied(false);
  };

  return (
    <Tooltip content={tooltip} delayDuration={500}>
      <button
        className="relative flex items-stretch hover:opacity-80"
        onClick={handleClick}
      >
        <Tag variant="dark">
          <div className="flex items-center gap-1 [&>svg]:size-[18px]">
            {copied ? <Check /> : <Copy />}
            <span className="sr-only">{tooltip}</span>
          </div>
        </Tag>
      </button>
    </Tooltip>
  );
};
