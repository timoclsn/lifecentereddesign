import React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
  description: string;
  slug: string;
  previewImage: string;
}

export function SEO({ title, description, slug, previewImage }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <link
        rel="canonical"
        href={`https://lifecentereddesign.net${slug}`}
        key="canonical"
      />

      <meta property="og:type" content="website" key="og:type" />
      <meta
        property="og:site_name"
        content="Life Centered Design.Net"
        key="og:site_name"
      />
      <meta property="og:locale" content="en" key="og:locale" />
      <meta
        property="og:url"
        content={`https://lifecentereddesign.net${slug}`}
        key="og:url"
      />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta
        property="og:image"
        content={`https://lifecentereddesign.net/${previewImage}`}
        key="og:image"
      />
      <meta
        property="og:image:alt"
        content="A hub for life-centered design"
        key="og:image:alt"
      />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />

      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />
    </Head>
  );
}
