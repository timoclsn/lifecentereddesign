import { ReactNode } from 'react';
import { Favicons } from './Favicons';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { SEO } from './SEO';

const defaultTitle = 'Life Centered Design Collective';

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
  slug?: string;
  previewImage?: string;
}

export const Layout = ({
  children,
  title,
  description,
  slug,
  previewImage,
}: Props) => {
  const pageTitle = !title ? defaultTitle : `${title}  |  ${defaultTitle}`;
  const pageDescription = description
    ? description
    : 'Life Centered Design Collective';
  slug = slug ? `/${slug}` : '';
  const pagePreviewImage = previewImage ? previewImage : 'og-image.png';
  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        slug={slug}
        previewImage={pagePreviewImage}
      />
      <Favicons />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
};
