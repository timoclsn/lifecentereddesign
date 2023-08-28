import { Bleed, Card, Heading, getRandomCardVariant } from 'design-system';
import { AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { getResourceCached, getResourcesCached } from '../../lib/cache';
import { ContentType, Thoughtleader } from '../../lib/resources';
import { Await } from '../Await/Await';
import { getCardComponent } from '../utils';
import groundImg from './ground.jpg';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const RelatedResources = ({ resourceId, resourceType }: Props) => {
  const resource = getResourceCached(resourceId, resourceType);
  return (
    <Await promise={resource} loading={null} error={null}>
      {(data) => {
        if (data.type !== 'thoughtleader') {
          return null;
        }
        const resource = data as Thoughtleader;
        const resources = getResourcesCached();

        return (
          <Bleed>
            <section id="new-resources">
              <Heading
                level="2"
                className="text-primary mb-10 px-6 sm:px-8 xl:px-10"
              >
                {`More from ${resource.name}`}
              </Heading>
              <ul className="mb-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 sm:snap-none sm:px-8 xl:px-10">
                <li className="hidden flex-none snap-center sm:block">
                  <Image
                    src={groundImg}
                    alt="Image of desert ground."
                    className="rounded-4xl h-full object-cover"
                  />
                </li>
                <Await
                  promise={resources}
                  loading={<Loading />}
                  error={<Error />}
                >
                  {(resources) => {
                    const resourcesToDisplay = resources
                      .filter((filteredResource) => {
                        if ('authors' in filteredResource) {
                          return filteredResource.authors.some(
                            (author) => author.id === resource.id,
                          );
                        }
                        if ('hosts' in filteredResource) {
                          return filteredResource.hosts.some(
                            (host) => host.id === resource.id,
                          );
                        }
                        if ('guests' in filteredResource) {
                          return filteredResource.guests.some(
                            (guest) => guest.id === resource.id,
                          );
                        }
                        if ('creators' in filteredResource) {
                          return filteredResource.creators.some(
                            (creator) => creator.id === resource.id,
                          );
                        }
                        return false;
                      })
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime(),
                      );
                    return (
                      <>
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
                      </>
                    );
                  }}
                </Await>
              </ul>
            </section>
          </Bleed>
        );
      }}
    </Await>
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
        Error loading new resources. Please try again…
      </Card>
    </li>
  );
};
