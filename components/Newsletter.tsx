import { UilEnvelopeAlt } from '@iconscout/react-unicons';
import Image from 'next/future/image';
import { Button } from './Button';
import { CenteredColumn } from './CenteredColumn';

export const Newsletter = () => {
  return (
    <section className="relative ml-[calc(50%-50vw)] w-screen overflow-hidden bg-[#EDF4EE]">
      <Image
        src="/forest.jpg"
        alt="Image of a foggy forest."
        width={1949}
        height={1466}
        className="h-[800px] w-full object-cover object-top"
      />
      <div className="absolute top-0 left-0 h-full w-full py-28">
        <CenteredColumn>
          <h2 className="text-white mb-10 font-serif text-4xl font-bold">
            Newsletter
          </h2>
          <p className="mb-16 text-2xl text-text-secondary">
            Sign up for our Newsletter in case you want to get new resources and
            other news delivered to your inbox. We are mindful about this
            Newsletter and will only send you updates when there is interesting
            news to share.
          </p>
          <div className="flex flex-col items-center gap-8 sm:flex-row">
            <a
              href="http://eepurl.com/htoWRr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[645px] bg-ghost-main-dark-bg py-6 px-10"
            >
              <span className="text-2xl text-text-secondary">
                Email address
              </span>
            </a>
            <Button size="large" href="http://eepurl.com/htoWRr" external>
              <UilEnvelopeAlt />
              Newsletter Signup
            </Button>
          </div>
        </CenteredColumn>
      </div>
    </section>
  );
};
