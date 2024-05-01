import { RelatedResources, Topics } from '@/data/resources/query';
import Link from 'next/link';
import { Fragment } from 'react';
import { TopicsButton } from './ResourceCard/TopicsButton';

const types = {
  Thoughtleader: 16,
  Podcast: 11,
};

export const topicsList = (topics: Topics) => {
  return topics.map((topic, index) => {
    return (
      <Fragment key={topic.name}>
        <TopicsButton topicName={topic.name}>{topic.name}</TopicsButton>
        {index !== topics.length - 1 && ', '}
      </Fragment>
    );
  });
};

export const catagorizeRelatedResources = (resources: RelatedResources) => {
  const relatedResources: Record<
    'thoughtleaders' | 'podcasts' | 'others',
    RelatedResources
  > = {
    thoughtleaders: [],
    podcasts: [],
    others: [],
  };

  resources.forEach((resource) => {
    if (resource.type === types.Thoughtleader) {
      relatedResources.thoughtleaders.push(resource);
    } else if (resource.type === types.Podcast) {
      relatedResources.podcasts.push(resource);
    } else {
      relatedResources.others.push(resource);
    }
  });

  return relatedResources;
};

export const relatedResourceList = (relatedResources: RelatedResources) => {
  return relatedResources.map((relatedResource, index) => {
    return (
      <Fragment key={relatedResource.id}>
        <Link
          href={`/resources/${relatedResource.id}`}
          prefetch={false}
          className="relative inline-flex items-center justify-center gap-0.5 hover:underline"
        >
          {relatedResource.name}
        </Link>
        {index !== relatedResources.length - 1 && ', '}
      </Fragment>
    );
  });
};
