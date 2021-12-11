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
import { srOnly } from '../utils.css';
import { sprinkles } from '../sprinkles.css';

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
    <Card color={color} className={sprinkles({ flex: 1, width: 'full' })}>
      <Stack direction="horizontal" space="8px">
        <Box overflow="hidden" borderRadius="full" className={imageBorder}>
          <Image
            src={image}
            alt={`Portrait image of ${name}`}
            width={120}
            height={120}
          />
        </Box>
        <Stack space="32px" className={sprinkles({ flex: 1 })}>
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
                <Box
                  as="a"
                  cursor="pointer"
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Box as="span" className={srOnly}>
                    Website of {name}
                  </Box>
                  <IoIosGlobe size={24} />
                </Box>
              </li>
            )}
            {linkedin && (
              <li>
                <Box
                  as="a"
                  cursor="pointer"
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Box as="span" className={srOnly}>
                    LinkedIn of {name}
                  </Box>
                  <IoLogoLinkedin size={24} />
                </Box>
              </li>
            )}
            {instagram && (
              <li>
                <Box
                  as="a"
                  cursor="pointer"
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Box as="span" className={srOnly}>
                    Instagram of {name}
                  </Box>
                  <IoLogoInstagram size={24} />
                </Box>
              </li>
            )}
            {twitter && (
              <li>
                <Box
                  as="a"
                  cursor="pointer"
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Box as="span" className={srOnly}>
                    Twitter of {name}
                  </Box>
                  <IoLogoTwitter size={24} />
                </Box>
              </li>
            )}
          </Inline>
        </Stack>
      </Stack>
    </Card>
  );
}
