import { Card, CardProps, Heading, Text } from 'design-system';
import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
import {
  IoIosGlobe,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
} from 'react-icons/io';

interface Props {
  children: ReactNode;
  name: string;
  image: StaticImageData;
  websiteUrl?: string;
  linkedInUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  variant?: CardProps['variant'];
}

export function ProfileCard({
  children,
  name,
  image,
  websiteUrl,
  linkedInUrl,
  instagramUrl,
  twitterUrl,
  variant = 'sand',
}: Props) {
  return (
    <Card variant={variant}>
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <Image
          src={image}
          alt={`Portrait image of ${name}`}
          className="border-primary-contrast-text rounded-full border-4 border-solid leading-none w-[120px]"
        />
        <div className="flex-1">
          <Heading as="h2" level="4" className="mb-1">
            {name}
          </Heading>
          <Text as="p" className="mb-6 text-text-secondary">
            {children}
          </Text>
          <ul className="flex space-x-4">
            {websiteUrl && (
              <li>
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">Website of {name}</span>
                  <IoIosGlobe size={24} />
                </a>
              </li>
            )}
            {linkedInUrl && (
              <li>
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">LinkedIn of {name}</span>
                  <IoLogoLinkedin size={24} />
                </a>
              </li>
            )}
            {instagramUrl && (
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Instagram of {name}</span>
                  <IoLogoInstagram size={24} />
                </a>
              </li>
            )}
            {twitterUrl && (
              <li>
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">Twitter of {name}</span>
                  <IoLogoTwitter size={24} />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
}
