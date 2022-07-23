import Image from 'next/image';
import {
  Article,
  Book,
  CommunityOrOrganization,
  Course,
  Directory,
  Podcast,
  PodcastEpisode,
  Resources,
  Thoughtleader,
  Tool,
  Video,
} from '../lib/content';
import { ArticleCard } from './ArticleCard';
import { BookCard } from './BookCard';
import { Button } from './Button';
import { CommunityOrOranizationCard } from './CommunityOrOranizationCard';
import { CourseCard } from './CourseCard';
import { DirectoryCard } from './DirectoryCard';
import { PodcastCard } from './PodcastCard';
import { PodcastEpisodeCard } from './PodcastEpisodeCard';
import { ThoughtleaderCard } from './ThoughtleaderCard';
import { ToolCard } from './ToolCard';
import { VideoCard } from './VideoCard';

interface Props {
  resources: Resources;
}

export const NewResources = ({ resources }: Props) => {
  const newResources = resources
    .sort(
      (a, b) =>
        new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
    )
    .slice(0, 10);

  return (
    <section className="relative rounded-5xl bg-black p-20">
      <div className="absolute top-0 left-0 z-10 h-full w-full overflow-hidden opacity-30">
        <div className="absolute right-[18px] top-[18px]">
          <Image
            src="/confetti-top.svg"
            width={938}
            height={109}
            alt="Confetti"
          />
        </div>
        <div className="absolute left-[-10px] top-[102px]">
          <Image
            src="/confetti-left.svg"
            width={72}
            height={435}
            alt="Confetti"
          />
        </div>
        <div className="absolute right-[-6px] bottom-[26px]">
          <Image
            src="/confetti-right.svg"
            width={238}
            height={143}
            alt="Confetti"
          />
        </div>
        <div className="absolute left-[28px] bottom-[-8px]">
          <Image
            src="/confetti-bottom.svg"
            width={1136}
            height={79}
            alt="Confetti"
          />
        </div>
      </div>
      <div className="relative z-20">
        <h2 className="mb-10 text-3xl font-bold text-white">New Resources</h2>
        <ul className="-mx-20 mb-14 flex gap-6 overflow-x-scroll px-20">
          {newResources.map((ressource) => {
            let component;

            switch (ressource.type) {
              case 'thoughtleader':
                component = (
                  <ThoughtleaderCard
                    thoughtleader={ressource as Thoughtleader}
                  />
                );
                break;
              case 'book':
                component = <BookCard book={ressource as Book} />;
                break;
              case 'article':
                component = <ArticleCard article={ressource as Article} />;
                break;
              case 'course':
                component = <CourseCard course={ressource as Course} />;
                break;
              case 'podcast':
                component = <PodcastCard podcast={ressource as Podcast} />;
                break;
              case 'podcastEpisode':
                component = (
                  <PodcastEpisodeCard
                    podcastEpisode={ressource as PodcastEpisode}
                  />
                );
                break;
              case 'video':
                component = <VideoCard video={ressource as Video} />;
                break;
              case 'tool':
                component = <ToolCard tool={ressource as Tool} />;
                break;
              case 'directory':
                component = (
                  <DirectoryCard directory={ressource as Directory} />
                );
                break;
              case 'communityOrOrganization':
                component = (
                  <CommunityOrOranizationCard
                    communityOrOrganization={
                      ressource as CommunityOrOrganization
                    }
                  />
                );
                break;
              default:
                throw new Error(`Unknown ressource type: ${ressource.type}`);
            }

            return (
              <li key={ressource.id} className="w-[600px] flex-none">
                {component}
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex-none">
            <Button
              text="Newsletter Signup"
              size="l"
              href="http://eepurl.com/htoWRr"
              target="_blank"
              bgColor="bg-white"
              secondary
            />
          </div>
          <p className="text-white">
            Sign up for our Newsletter in case you want to get new resources and
            other news delivered to your inbox. We are mindful about this
            Newsletter and will only send you updates when there is interesting
            news to share.
          </p>
        </div>
      </div>
    </section>
  );
};
