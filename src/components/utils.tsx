import { Creators, Topics } from '@/data/resources/query';
import Link from 'next/link';
import { Fragment } from 'react';
import { TopicsButton } from './ResourceCard/TopicsButton';

export const topicsList = (topics: Topics) => {
  return topics.map((topic, index) => {
    return (
      <Fragment key={topic.id}>
        <TopicsButton topic={topic.id}>{topic.name}</TopicsButton>
        {index !== topics.length - 1 && ', '}
      </Fragment>
    );
  });
};

export const creatorList = (creators: Creators) => {
  return creators.map((creator, index) => {
    return (
      <Fragment key={creator.id}>
        <Link
          href={`/resources/${creator.id}`}
          className="relative inline-flex items-center justify-center gap-0.5 hover:underline"
        >
          {creator.name}
        </Link>
        {index !== creators.length - 1 && ', '}
      </Fragment>
    );
  });
};
