import { Track } from 'components/Track/Track';
import {
  Bleed,
  Card,
  Heading,
  Text,
  getRandomCardVariant,
} from 'design-system';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getResourceCached, getResourcesCached } from '../../lib/cache';
import { ContentType, Resource, Resources } from '../../lib/resources';
import { Await } from '../Await/Await';
import { getCardComponent } from '../utils';
import birdsImg from './birds.jpg';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const RelatedResources = ({ resourceId, resourceType }: Props) => {
  const promise = Promise.all([
    getResourceCached(resourceId, resourceType),
    getResourcesCached(),
  ]);
  return (
    <Bleed>
      <section id="related-resources">
        <Heading level="2" className="text-primary mb-10 px-6 sm:px-8 xl:px-10">
          Related Resources
        </Heading>
        <ul className="mb-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 sm:snap-none sm:px-8 xl:px-10">
          <li className="hidden flex-none snap-center snap-always sm:block">
            <Image
              src={birdsImg}
              alt="Image of desert ground."
              placeholder="blur"
              className="rounded-4xl h-full object-cover"
            />
          </li>
          <Await promise={promise} loading={<Loading />} error={<Error />}>
            {([resource, resources]) => {
              const resourcesToDisplay = getRelatedResources(
                resource,
                resources,
              );

              return (
                <>
                  {resourcesToDisplay.map((resource) => {
                    const component = getCardComponent(resource);
                    return (
                      <Track
                        as="li"
                        key={`${resource.type}-${resource.id}`}
                        event="Related resource clicked"
                        className="relative w-[330px] flex-none snap-center snap-always sm:w-[600px]"
                      >
                        {component}
                      </Track>
                    );
                  })}
                </>
              );
            }}
          </Await>
          <li className="rounded-4xl flex-none snap-center snap-always">
            <Link href="/resources" className="block h-full hover:opacity-80">
              <Card
                variant="primary"
                className="flex h-full items-center justify-center"
              >
                <div className="text-primary-contrast-text flex items-center justify-center gap-2 [&>svg]:h-[25px] [&>svg]:w-[25px]">
                  <ArrowRight />
                  <Text size="large">All Resources</Text>
                </div>
              </Card>
            </Link>
          </li>
        </ul>
      </section>
    </Bleed>
  );
};

const Loading = () => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <li
              key={index}
              className="h-[492px] w-[330px] flex-none animate-pulse sm:w-[600px]"
            >
              <Card variant={getRandomCardVariant()} className="h-full" />
            </li>
          );
        })}
    </>
  );
};

const Error = () => {
  return (
    <li className="h-[492px] w-[330px] flex-none sm:w-[600px]">
      <Card
        variant="error"
        className="flex h-full items-center justify-center gap-2 text-xl text-white"
      >
        <AlertTriangle />
        Error loading related resources. Please try again…
      </Card>
    </li>
  );
};

const getResourcesFromThoughtleader = (
  resources: Resources,
  thoughtleader: Resource,
) => {
  return resources.filter((filteredResource) => {
    if ('authors' in filteredResource) {
      return filteredResource.authors.some(
        (author) => author.id === thoughtleader.id,
      );
    }
    if ('hosts' in filteredResource) {
      return filteredResource.hosts.some(
        (host) => host.id === thoughtleader.id,
      );
    }
    if ('guests' in filteredResource) {
      return filteredResource.guests.some(
        (guest) => guest.id === thoughtleader.id,
      );
    }
    if ('creators' in filteredResource) {
      return filteredResource.creators.some(
        (creator) => creator.id === thoughtleader.id,
      );
    }
    return false;
  });
};

const getRelatedThoughtleaders = (resource: Resource, resources: Resources) => {
  return [
    ...('authors' in resource ? resource.authors : []),
    ...('hosts' in resource ? resource.hosts : []),
    ...('guests' in resource ? resource.guests : []),
    ...('creators' in resource ? resource.creators : []),
  ]
    .map((thoughtleader) =>
      resources.find(
        (resource) =>
          resource.id === thoughtleader.id &&
          resource.type === thoughtleader.type,
      ),
    )
    .filter(
      (thoughtleader): thoughtleader is Resource => thoughtleader !== undefined,
    );
};

const getRelatedResources = (resource: Resource, resources: Resources) => {
  let relatedResources: Resources = [];

  if (resource.type === 'thoughtleader') {
    relatedResources = sortRelatedRsources(
      getResourcesFromThoughtleader(resources, resource),
    );
  } else {
    const relatedThoughtleaders = sortRelatedRsources(
      getRelatedThoughtleaders(resource, resources),
    );
    const relatedThoughtleaderResources = relatedThoughtleaders.flatMap(
      (relatedThoughtleader) => {
        return getResourcesFromThoughtleader(resources, relatedThoughtleader);
      },
    );

    const relatedTopics = resource.topics;
    const relatedTopicResources = resources.filter((filteredResource) => {
      return filteredResource.topics.some((topic) =>
        relatedTopics.some((relatedTopic) => relatedTopic.id === topic.id),
      );
    });

    const relatedThoughtLeadersAndTopicsResources = sortRelatedRsources([
      ...relatedTopicResources,
      ...relatedThoughtleaderResources,
    ]);

    relatedResources = [
      ...relatedThoughtleaders,
      ...relatedThoughtLeadersAndTopicsResources,
    ];
  }

  // Clean up
  relatedResources = removeDuplicateResources(relatedResources);
  relatedResources = removeCurrentResource(resource, relatedResources);

  // Fallback
  if (relatedResources.length === 0) {
    relatedResources = sortRelatedRsources(getRandomResources(resources));
    relatedResources = removeCurrentResource(resource, relatedResources);
  }

  return relatedResources.slice(0, 10);
};

const removeDuplicateResources = (resources: Resources) => {
  return resources.filter(
    (filteredResource, index, self) =>
      index ===
      self.findIndex(
        (selfResource) =>
          selfResource.id === filteredResource.id &&
          selfResource.type === filteredResource.type,
      ),
  );
};

const removeCurrentResource = (resource: Resource, resources: Resources) => {
  return resources.filter(
    (filteredResource) =>
      filteredResource.id !== resource.id ||
      filteredResource.type !== resource.type,
  );
};

const getRandomResources = (resources: Resources) => {
  return resources.sort(() => Math.random() - 0.5);
};

// Sort by likes, then comments, and then date
const sortRelatedRsources = (resources: Resources) => {
  return resources.sort((a, b) => {
    const aLikes = a.likes;
    const bLikes = b.likes;
    const aComments = a.comments;
    const bComments = b.comments;
    const aDate = new Date(a.createdAt).getTime();
    const bDate = new Date(b.createdAt).getTime();

    if (aLikes !== bLikes) {
      return bLikes - aLikes;
    }
    if (aComments !== bComments) {
      return bComments - aComments;
    }
    return bDate - aDate;
  });
};
