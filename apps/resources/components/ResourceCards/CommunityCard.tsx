import { UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
import { Community } from 'lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

interface Props {
  community: Community;
}

export const CommunityCard = ({ community }: Props) => {
  return (
    <Card
      resourceId={community.id}
      resourceType={community.type}
      variant="morning"
      displayType="Community"
      // onTypeClick={
      //   inContext
      //     ? () => {
      //         dispatch({
      //           type: 'FILTER_BY_TYPE',
      //           typeIs: 'community',
      //         });
      //       }
      //     : undefined
      // }
      // onCategoryClick={
      //   inContext
      //     ? () => {
      //         dispatch({
      //           type: 'FILTER_BY_CATEGORY',
      //           category: community.category?.name,
      //         });
      //       }
      //     : undefined
      // }
      title={community.name}
      metaInfos={[
        ...(community.topics.length
          ? [
              {
                text: community.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
      category={community.category?.name}
      tags={[
        ...(community.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(community.link),
                url: community.link,
              },
            ]
          : []),
      ]}
      description={community.description}
      suggestion={community.suggestion}
      note={community.note}
      showType
    />
  );
};
