'use client';

import { Check, Copy } from 'lucide-react';
import { Tag, Tooltip } from 'design-system';
import { wait } from 'lib/utils';
import { useState } from 'react';

interface Props {
  link: string;
}

export const CopyButton = ({ link }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    setCopied(true);
    navigator.clipboard.writeText(link);
    splitbee.track('Copy resource link');
    await wait(3000);
    setCopied(false);
  };

  return (
    <Tooltip content="Copy resource link" delayDuration={500}>
      <button className="flex items-stretch" onClick={copyLink}>
        <Tag variant="dark">
          <div className="flex items-center gap-1">
            {copied ? <Check size="18" /> : <Copy size="18" />}
            <span className="sr-only">Copy resource link</span>
          </div>
        </Tag>
      </button>
    </Tooltip>
  );
};
