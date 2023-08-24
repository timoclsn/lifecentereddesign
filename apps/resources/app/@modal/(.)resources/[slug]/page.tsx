import { Heading } from 'design-system';
import { Await } from '../../../../components/Await/Await';
import { Comments } from '../../../../components/Comments/Comments';
import { getResourceCached } from '../../../../lib/resources';
import { parseResourceSlug } from '../../../../lib/utils';
import { Modal } from './Modal';

interface Props {
  params: {
    slug: string;
  };
}

const ResourceModal = ({ params }: Props) => {
  const { slug } = params;
  const { resourceId, resourceType } = parseResourceSlug(slug);
  const resource = getResourceCached(resourceId, resourceType);
  return (
    <Modal>
      <div className="mb-10">
        <Await
          promise={resource}
          loading={
            <Heading as="h2" level="3">
              Loading resource title…
            </Heading>
          }
          error={<div>Something went wrong</div>}
        >
          {(resource) => {
            const title = 'name' in resource ? resource.name : resource.title;
            return (
              <Heading as="h2" level="3">
                {title}
              </Heading>
            );
          }}
        </Await>
      </div>
      <Comments resourceId={resourceId} resourceType={resourceType} />
    </Modal>
  );
};

export default ResourceModal;
