import { query } from '@/api/query';
import { NewResources } from '@/components/NewResources/NewResources';
import { RecommendedResources } from '@/components/RecommendedResources/RecommendedResources';
import { notFound } from 'next/navigation';
import { Comments } from '../../../components/Comments/Comments';
import { Newsletter } from '../../../components/Newsletter/Newsletter';
import { ResourceDetailsCard } from '../../../components/ResourceDetailsCard/ResourceDetailsCard';
import { createGenerateMetadata } from '../../../lib/metadata';
import { getBaseUrl } from '../../../lib/utils/utils';

export const generateMetadata = createGenerateMetadata(async ({ params }) => {
  const { slug } = await params;

  const resource = await query.resources.getResourceBySlug({
    slug,
  });

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
  params: Promise<{ slug: string }>;
}

const ResourcePage = async ({ params }: Props) => {
  const { slug } = await params;

  return (
    <>
      <ResourceDetailsCard slug={slug} />
      <Comments slug={slug} />
      <RecommendedResources slug={slug} />
      <NewResources />
      <Newsletter />
    </>
  );
};

export default ResourcePage;
