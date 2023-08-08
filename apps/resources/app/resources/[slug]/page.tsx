import { NewResources } from '../../../components/NewResources/NewResources';
import { Newsletter } from '../../../components/Newsletter/Newsletter';
import { ResourceCard } from '../../../components/ResourceCard/ResourceCard';
import { createGenerateMetadata } from '../../../lib/metadata';
import { ContentType, getResourceCached } from '../../../lib/resources';
import { getBaseUrl } from '../../../lib/utils';

const parseSlug = (slug: string) => {
  const resourceType = slug.split('-').at(0) as ContentType;
  const resourceId = parseInt(slug.split('-').at(1) as string);
  return { resourceType, resourceId };
};

export const generateMetadata = createGenerateMetadata(async ({ params }) => {
  const { slug } = params;
  const { resourceId, resourceType } = parseSlug(slug);
  const resource = await getResourceCached(resourceId, resourceType);

  const title = 'name' in resource ? resource.name : resource.title;
  const description =
    'A resource from LifeCenteredDesign.Net: A curated directory of resources around Life-centered Design and related fields.';
  const type = resource.type;
  const category = resource.category ? resource.category.name : '';
  const link = resource.link || '';

  const searchParams = new URLSearchParams();
  searchParams.set('title', title);
  searchParams.set('type', type);
  searchParams.set('category', category);
  searchParams.set('link', link);

  return {
    title,
    openGraph: {
      type: 'website',
      title,
      url: `${getBaseUrl()}/resources/${slug}`,
      siteName: 'LifeCenteredDesign.Net',
      description,
      images: {
        url: `/resource-og-image?${searchParams.toString()}`,
        alt: title,
        width: 1200,
        height: 630,
      },
    },
  };
});

interface Props {
  params: {
    slug: string;
  };
}

const ResourcePage = async ({ params }: Props) => {
  const { slug } = params;
  const { resourceId, resourceType } = parseSlug(slug);

  return (
    <>
      <ResourceCard resourceId={resourceId} resourceType={resourceType} />
      <NewResources />
      <Newsletter />
    </>
  );
};

export default ResourcePage;
