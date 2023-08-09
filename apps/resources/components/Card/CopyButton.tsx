'use client';

import { Tag, Tooltip } from 'design-system';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { wait } from '../../lib/utils';

interface Props {
  link: string;
}

export const CopyButton = ({ link }: Props) => {
  const [copied, setCopied] = useState(false);
  const tooltip = 'Copy resource link';

  const handleClick = async () => {
    setCopied(true);
    navigator.clipboard.writeText(link);
    splitbee.track(tooltip);
    await wait(3000);
    setCopied(false);
  };

  return (
    <Tooltip content={tooltip} delayDuration={500}>
      <button
        className="flex items-stretch hover:opacity-80"
        onClick={handleClick}
      >
        <Tag variant="dark">
          <div className="flex items-center gap-1 [&>svg]:h-[18px] [&>svg]:w-[18px]">
            {copied ? <Check /> : <Copy />}
            <span className="sr-only">{tooltip}</span>
          </div>
        </Tag>
      </button>
    </Tooltip>
  );
};
