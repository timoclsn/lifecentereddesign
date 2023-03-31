import { UilAt, UilLinkAlt } from '@iconscout/react-unicons';
import { SocialMediaProfile } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  socielaMediaProfile: SocialMediaProfile;
}

export const SocialMediaProfileCard = ({ socielaMediaProfile }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext } = state;
  return (
    <Card
      resourceId={socielaMediaProfile.id}
      resourceType={socielaMediaProfile.type}
      variant="lime"
      displayType="Social Media Profile"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_TYPE',
                typeIs: 'socialMediaProfile',
              });
            }
          : undefined
      }
      onCategoryClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_CATEGORY',
                category: socielaMediaProfile.category?.name,
              });
            }
          : undefined
      }
      title={socielaMediaProfile.name}
      metaInfos={[
        ...(socielaMediaProfile.handle
          ? [
              {
                text: socielaMediaProfile.handle,
                icon: UilAt,
              },
            ]
          : []),
      ]}
      category={socielaMediaProfile.category?.name}
      tags={[
        ...(socielaMediaProfile.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(socielaMediaProfile.link),
                url: socielaMediaProfile.link,
              },
            ]
          : []),
      ]}
      description={socielaMediaProfile.description}
      suggestion={socielaMediaProfile.suggestion}
      showType
    />
  );
};
