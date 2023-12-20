import { Resource } from 'lib/resources';
import { DownloadButtonClient } from './DownloadButtonClient';

interface Props {
  resources: Array<Resource>;
}

export const DownloadButton = ({ resources }: Props) => {
  const downloadableResources = resources.map((resource) => {
    return {
      title: 'title' in resource ? resource.title : resource.name,
      link: resource.link ?? '',
    };
  });
  const csv = convertToCsv(downloadableResources);
  return <DownloadButtonClient csv={csv} />;
};

const convertToCsv = (
  resources: Array<{
    title: string;
    link: string;
  }>,
) => {
  const headers = ['Title', 'Link'];
  const rows = resources.map((resource) => [resource.title, resource.link]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n');

  return csv;
};
