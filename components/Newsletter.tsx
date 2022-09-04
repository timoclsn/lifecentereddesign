import { UilEnvelopeAlt } from '@iconscout/react-unicons';
import { Button } from './Button';
import { CenteredColumn } from './CenteredColumn';

export const Newsletter = () => {
  return (
    <section className="ml-[calc(50%-50vw)] w-screen bg-[#EDF4EE] py-28">
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
        <div className="flex items-center gap-8">
          <a
            href="http://eepurl.com/htoWRr"
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[645px] bg-ghost-main-dark-bg py-6 px-10"
          >
            <span className="text-2xl text-text-secondary">Email address</span>
          </a>
          <Button size="large" href="http://eepurl.com/htoWRr" external>
            <UilEnvelopeAlt />
            Newsletter Signup
          </Button>
        </div>
      </CenteredColumn>
    </section>
  );
};
