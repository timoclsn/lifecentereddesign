import { Card, CardProps, Heading, Text } from '@/components/design-system';
import { Globe, Instagram, Linkedin, Twitter } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

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
      <div className="flex flex-col items-start gap-6 sm:flex-row">
        <Image
          src={image}
          alt={`Portrait image of ${name}`}
          placeholder="blur"
          className="border-primary-contrast-text w-[120px] rounded-full border-4 border-solid leading-none"
        />
        <div className="flex-1">
          <Heading as="h2" level="4" className="mb-1">
            {name}
          </Heading>
          <Text as="p" className="text-text-secondary mb-6">
            {children}
          </Text>
          <ul className="flex space-x-4">
            {websiteUrl && (
              <li>
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">Website of {name}</span>
                  <Globe size={24} />
                </a>
              </li>
            )}
            {linkedInUrl && (
              <li>
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">LinkedIn of {name}</span>
                  <Linkedin size={24} />
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
                  <Instagram size={24} />
                </a>
              </li>
            )}
            {twitterUrl && (
              <li>
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">Twitter of {name}</span>
                  <Twitter size={24} />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
}
