import React from 'react';
import Image from 'next/image';
import {
  IoIosGlobe,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
} from 'react-icons/io';

import { Box } from '../Box';
import type { BoxProps } from '../Box';
import { Card } from '../Card';
import { Heading } from '../Heading';
import { Inline } from '../Inline';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { imageBorder } from './ProfileCard.css';

interface Props {
  name: string;
  image: string;
  job: { role: string; url: string; name: string };
  website?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  color?: BoxProps['background'];
}

export function ProfileCard({
  name,
  image,
  job,
  website,
  linkedin,
  instagram,
  twitter,
  color = 'oak-normal',
}: Props) {
  return (
    <Box flex={1} width="full">
      <Card color={color}>
        <Stack direction="horizontal" space="8px">
          <div className={imageBorder}>
            <Image
              src={image}
              alt={`Portrait image of ${name}`}
              width={120}
              height={120}
            />
          </div>
          <Box flex={1}>
            <Stack space="32px">
              <Stack space="24px">
                <Heading as="h3" size="16px">
                  {name}
                </Heading>
                <Text as="p">
                  {job.role} @{' '}
                  <Box as="a" textDecoration="underline" href={job.url}>
                    {job.name}
                  </Box>
                </Text>
              </Stack>
              <Inline as="ul" space="16px">
                {website && (
                  <li>
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      <Box as="span" srOnly="true">
                        Website of {name}
                      </Box>
                      <IoIosGlobe size={24} />
                    </a>
                  </li>
                )}
                {linkedin && (
                  <li>
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Box as="span" srOnly="true">
                        LinkedIn of {name}
                      </Box>
                      <IoLogoLinkedin size={24} />
                    </a>
                  </li>
                )}
                {instagram && (
                  <li>
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Box as="span" srOnly="true">
                        Instagram of {name}
                      </Box>
                      <IoLogoInstagram size={24} />
                    </a>
                  </li>
                )}
                {twitter && (
                  <li>
                    <a href={twitter} target="_blank" rel="noopener noreferrer">
                      <Box as="span" srOnly="true">
                        Twitter of {name}
                      </Box>
                      <IoLogoTwitter size={24} />
                    </a>
                  </li>
                )}
              </Inline>
            </Stack>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}
