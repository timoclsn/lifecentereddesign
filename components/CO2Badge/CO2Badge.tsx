import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { FiArrowRight, FiX } from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri';

import type { CO2 } from '../../lib/co2';
import { Box } from '../Box';
import { Card } from '../Card';
import { sprinkles } from '../sprinkles.css';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { list } from './CO2Badge.css';

interface Props {
  co2Consumption: CO2;
}

export function CO2Badge({ co2Consumption }: Props) {
  return (
    <Popover.Root>
      <Box
        as={Popover.Trigger}
        display="flex"
        alignItems="center"
        gap="8px"
        paddingX="16px"
        paddingY="8px"
        fontWeight="bold"
        background="grass-normal"
      >
        <RiLeafLine size={22} />
        <span>
          {co2Consumption.co2} g of CO<sub>2</sub>
        </span>
      </Box>
      <Popover.Content sideOffset={40}>
        <Card
          color="grass-normal"
          className={sprinkles({
            maxWidth: { default: '320px', '640px': '640px' },
          })}
        >
          <Stack space="32px">
            <Popover.Close>
              <FiX size={24} />
            </Popover.Close>
            <Heading as="h2" size="32px">
              Website carbon footprint:
            </Heading>
            <Stack space="24px">
              <Text>
                Everytime someone opens this website only{' '}
                <strong>{co2Consumption.co2} g of CO2</strong> are produced.
                This site is{' '}
                <strong>cleaner than {co2Consumption.cleanerThan} %</strong> of
                web pages tested on the{' '}
                <a
                  href="https://www.websitecarbon.com"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  Website Carbon Calculator
                </a>
                .
              </Text>
              <Text>
                What we considered to make this page as clean as possible:
              </Text>
              <Stack as="ul" className={list} space="8px">
                <li>Reduce information to text</li>
                <li>Only use images where they bring a real value</li>
                <li>Use static page generation</li>
                <li>Serve from edge CDN</li>
                <li>Self-host optimized font file in modern file format</li>
                <li>Focus on page speed</li>
              </Stack>
              <Button
                as="a"
                variant="link"
                href="https://www.websitecarbon.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiArrowRight size={24} />
                Website Carbon Calculator
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Popover.Content>
    </Popover.Root>
  );
}
