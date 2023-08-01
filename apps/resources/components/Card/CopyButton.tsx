'use client';

import { Tag, Tooltip } from 'design-system';
import { Check } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { wait } from '../../lib/utils';

interface Props {
  children: ReactNode;
  link: string;
  tooltip: string;
}

export const CopyButton = ({ children, link, tooltip }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    setCopied(true);
    navigator.clipboard.writeText(link);
    splitbee.track(tooltip);
    await wait(3000);
    setCopied(false);
  };

  return (
    <Tooltip content={tooltip} delayDuration={500}>
      <button className="flex items-stretch" onClick={copyLink}>
        <Tag variant="dark">
          <div className="flex items-center gap-1 [&>svg]:h-[18px] [&>svg]:w-[18px]">
            {copied ? <Check /> : children}
            <span className="sr-only">{tooltip}</span>
          </div>
        </Tag>
      </button>
    </Tooltip>
  );
};
