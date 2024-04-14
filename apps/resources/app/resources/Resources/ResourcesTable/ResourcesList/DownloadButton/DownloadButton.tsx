import { NewResources } from 'data/resources/query';
import { DownloadButtonClient } from './DownloadButtonClient';

interface Props {
  resources: NewResources;
}

export const DownloadButton = ({ resources }: Props) => {
  const downloadableResources = resources.map((resource) => {
    return {
      name: resource.name,
      link: resource.link,
    };
  });
  const csv = convertToCsv(downloadableResources);
  return <DownloadButtonClient csv={csv} />;
};

const convertToCsv = (
  resources: Array<{
    name: string;
    link: string;
  }>,
) => {
  const headers = ['Title', 'Link'];
  const rows = resources.map((resource) => [resource.name, resource.link]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n');

  return csv;
};
