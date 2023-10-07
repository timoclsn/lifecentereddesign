import { Page } from 'components/Page/Page';
import { SearchParams } from 'lib/types';
import { Comments } from '../../../components/Comments/Comments';
import { NewResources } from '../../../components/NewResources/NewResources';
import { Newsletter } from '../../../components/Newsletter/Newsletter';
import { RelatedResources } from '../../../components/RelatedResources/RelatedResources';
import { ResourceCard } from '../../../components/ResourceCard/ResourceCard';
import { getResourceCached } from '../../../lib/cache';
import { createGenerateMetadata } from '../../../lib/metadata';
import { getBaseUrl, parseResourceSlug } from '../../../lib/utils';

export const generateMetadata = createGenerateMetadata(async ({ params }) => {
  const { slug } = params;
  const { resourceId, resourceType } = parseResourceSlug(slug);

  try {
    var resource = await getResourceCached(resourceId, resourceType);
  } catch (error) {
    return {};
  }

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
  searchParams: SearchParams;
}

const ResourcePage = async ({ params, searchParams }: Props) => {
  const { slug } = params;
  const { resourceId, resourceType } = parseResourceSlug(slug);

  return (
    <Page searchParams={searchParams}>
      <ResourceCard resourceId={resourceId} resourceType={resourceType} />
      <Comments resourceId={resourceId} resourceType={resourceType} />
      <RelatedResources resourceId={resourceId} resourceType={resourceType} />
      <NewResources />
      <Newsletter />
    </Page>
  );
};

export default ResourcePage;
