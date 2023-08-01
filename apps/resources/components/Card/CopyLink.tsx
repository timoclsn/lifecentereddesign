import { Copy } from 'lucide-react';
import { CopyButton } from './CopyButton';

interface Props {
  link: string;
}

export const CopyLink = ({ link }: Props) => {
  return (
    <CopyButton link={link} tooltip="Copy resource link">
      <Copy />
    </CopyButton>
  );
};
