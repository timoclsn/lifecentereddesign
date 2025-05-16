import { Metadata } from 'next';

export const createGenerateMetadata = (
  generateMetadata: ({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }) => Promise<Metadata>,
) => generateMetadata;

export const title = 'LifeCenteredDesign.Net';
export const description =
  'A curated directory of resources around Life-centered Design and related fields.';
