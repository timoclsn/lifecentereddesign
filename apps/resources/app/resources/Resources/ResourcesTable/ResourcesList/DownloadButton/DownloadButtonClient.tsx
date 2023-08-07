'use client';

import { Button } from 'design-system';
import { Download } from 'lucide-react';

interface Props {
  csv: string;
}

export const DownloadButtonClient = ({ csv }: Props) => {
  return (
    <Button
      variant="outline"
      onClick={() => {
        downloadCsv(csv, 'lifecentereddesign-net-resources.csv');
        splitbee.track('Download Resources');
      }}
    >
      <Download />
      Download
    </Button>
  );
};

const downloadCsv = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
