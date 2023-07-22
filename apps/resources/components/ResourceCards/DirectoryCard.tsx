'use client';

import { UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
import { Directory } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  directory: Directory;
}

export const DirectoryCard = ({ directory }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext } = state;
  return (
    <Card
      resourceId={directory.id}
      resourceType={directory.type}
      variant="oak"
      displayType="Directory"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_TYPE',
                typeIs: 'directory',
              });
            }
          : undefined
      }
      onCategoryClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_CATEGORY',
                category: directory.category?.name,
              });
            }
          : undefined
      }
      title={directory.name}
      metaInfos={[
        ...(directory.topics.length
          ? [
              {
                text: directory.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
      category={directory.category?.name}
      tags={[
        ...(directory.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(directory.link),
                url: directory.link,
              },
            ]
          : []),
      ]}
      description={directory.description}
      suggestion={directory.suggestion}
      note={directory.note}
      showType
    />
  );
};
