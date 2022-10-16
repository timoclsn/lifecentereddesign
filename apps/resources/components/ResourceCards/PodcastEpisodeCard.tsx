import {
  UilLinkAlt,
  UilMicrophone,
  UilGrin,
  UilCalendarAlt,
  UilClockThree,
} from '@iconscout/react-unicons';
import { PodcastEpisode } from '../../lib/content';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  podcastEpisode: PodcastEpisode;
}

export const PodcastEpisodeCard = ({ podcastEpisode }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
  return (
    <Card
      variant="sand"
      type="Podcast Episode"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType:
                  filteredType === 'podcastEpisode' ? null : 'podcastEpisode',
              });
            }
          : undefined
      }
      title={podcastEpisode.fields.title}
      metaInfos={[
        ...(podcastEpisode.fields.podcast
          ? [
              {
                text: podcastEpisode.fields.podcast
                  .map((podcast) => podcast?.fields.title)
                  .join(', '),
                icon: UilMicrophone,
              },
            ]
          : []),
        ...(podcastEpisode.fields['podcast-not-relevant']
          ? [
              {
                text: podcastEpisode.fields['podcast-not-relevant'],
                icon: UilMicrophone,
              },
            ]
          : []),
        ...(podcastEpisode.fields.guest
          ? [
              {
                text: podcastEpisode.fields.guest
                  .map((guest) => guest?.fields.name)
                  .join(', '),
                icon: UilGrin,
              },
            ]
          : []),
        ...(podcastEpisode.fields.date
          ? [
              {
                text: new Date(podcastEpisode.fields.date).toLocaleDateString(
                  'en'
                ),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(podcastEpisode.fields.duration
          ? [
              {
                text:
                  Math.round(podcastEpisode.fields.duration / 60).toString() +
                  ' min',
                icon: UilClockThree,
              },
            ]
          : []),
      ]}
      category={podcastEpisode.fields.category?.at(0)?.fields.name}
      tags={[
        ...(podcastEpisode.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(podcastEpisode.fields.link),
                url: podcastEpisode.fields.link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
