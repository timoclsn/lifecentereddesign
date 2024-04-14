import { query } from 'api/query';
import { notFound } from 'next/navigation';
import { Comments } from '../../../components/Comments/Comments';
import { NewResources } from '../../../components/NewResources/NewResources';
import { Newsletter } from '../../../components/Newsletter/Newsletter';
import { ResourceDetailCard } from '../../../components/ResourceCard/ResourceCard';
import { createGenerateMetadata } from '../../../lib/metadata';
import { getBaseUrl } from '../../../lib/utils/utils';

export const generateMetadata = createGenerateMetadata(async ({ params }) => {
  const { slug } = params;

  const { resources } = await query.resources.getResourcesNew({
    filter: {
      id: [slug],
    },
  });

  const [resource] = resources;

  if (!resource) {
    notFound();
  }

  const ogImageLink = await query.resources.getOgImageLink({
    id: resource.id,
    url: resource.link,
  });

  const title = resource.name;
  const description =
    'A resource from LifeCenteredDesign.Net: A curated directory of resources around Life-centered Design and related fields.';
  const type = resource.type?.name || '';
  const category = resource.category?.name || '';
  const link = resource.link;

  const searchParams = new URLSearchParams();
  searchParams.set('title', title);
  searchParams.set('type', type);
  searchParams.set('category', category);
  searchParams.set('link', link);
  if (ogImageLink) {
    searchParams.set('ogImageLink', ogImageLink);
  }

  return {
    title,
    openGraph: {
      type: 'website',
      title,
      url: `${getBaseUrl()}/resources/${slug}`,
      siteName: 'LifeCenteredDesign.Net',
      description,
      images: {
        url: `/resource-og-image?${searchParams}`,
        alt: title,
        width: 1200,
        height: 630,
      },
    },
    alternates: {
      canonical: `/resources/${slug}`,
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

  return (
    <>
      <ResourceDetailCard id={slug} showPreview />
      <Comments id={slug} />
      {/* <RelatedResources resourceId={resourceId} resourceType={resourceType} /> */}
      <NewResources />
      <Newsletter />
    </>
  );
};

export default ResourcePage;
