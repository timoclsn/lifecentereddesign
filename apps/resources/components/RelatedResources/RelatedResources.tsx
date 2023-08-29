import { Bleed, Card, Heading, Text } from 'design-system';
import { ArrowRight } from 'lucide-react';
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
    <Await promise={promise} loading={null} error={null}>
      {([resource, resources]) => {
        const resourcesToDisplay = getRelatedResources(resource, resources);

        if (!resourcesToDisplay.length) {
          return null;
        }

        return (
          <Bleed>
            <section id="related-resources">
              <Heading
                level="2"
                className="text-primary mb-10 px-6 sm:px-8 xl:px-10"
              >
                Related resources
              </Heading>
              <ul className="mb-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 sm:snap-none sm:px-8 xl:px-10">
                <li className="hidden flex-none snap-center sm:block">
                  <Image
                    src={birdsImg}
                    alt="Image of desert ground."
                    className="rounded-4xl h-full object-cover"
                  />
                </li>

                {resourcesToDisplay.map((resource) => {
                  const component = getCardComponent(resource);
                  return (
                    <li
                      key={`${resource.type}-${resource.id}`}
                      className="relative w-[330px] flex-none snap-center sm:w-[600px]"
                    >
                      {component}
                    </li>
                  );
                })}
                <li className="rounded-4xl flex-none snap-center">
                  <Link
                    href="/resources"
                    className="block h-full hover:opacity-80"
                  >
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
      }}
    </Await>
  );
};

const getResourcesFromThoughtleader = (
  resources: Resources,
  thoughtleader: Resource,
) => {
  return resources
    .filter((filteredResource) => {
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
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
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
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
};

const getRelatedResources = (resource: Resource, resources: Resources) => {
  let relatedResources: Resources = [];

  if (resource.type === 'thoughtleader') {
    relatedResources = getResourcesFromThoughtleader(resources, resource);
  } else {
    const relatedThoughtleaders = getRelatedThoughtleaders(resource, resources);
    const relatedThoughtleaderResources = relatedThoughtleaders
      .flatMap((relatedThoughtleader) => {
        return getResourcesFromThoughtleader(resources, relatedThoughtleader);
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    relatedResources = [
      ...relatedThoughtleaderResources,
      ...relatedThoughtleaders,
    ];
  }

  return relatedResources
    .filter(
      // Remove duplicates
      (relatedResource, index, self) =>
        index ===
        self.findIndex(
          (selfResource) =>
            selfResource.id === relatedResource.id &&
            selfResource.type === relatedResource.type,
        ),
    )
    .filter(
      // Remove current resource
      (relatedResource) =>
        relatedResource.id !== resource.id &&
        relatedResource.type !== resource.type,
    );
};
