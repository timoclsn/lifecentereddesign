import { Comments } from '../../../../../components/Comments/Comments';
import { parseResourceSlug } from '../../../../../lib/utils';
import { Modal } from './Modal';

interface Props {
  params: {
    slug: string;
  };
}

const ResourceModal = ({ params }: Props) => {
  const { slug } = params;
  const { resourceId, resourceType } = parseResourceSlug(slug);
  return (
    <Modal>
      <Comments resourceId={resourceId} resourceType={resourceType} />
    </Modal>
  );
};

export default ResourceModal;
