import * as Popover from '@radix-ui/react-popover';
import { Heading, Link, Text } from 'design-system';
import { FiArrowRight, FiX } from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri';
import type { CO2 } from '../lib/co2';

interface Props {
  co2Consumption: CO2;
}

export function CO2Badge({ co2Consumption }: Props) {
  return (
    <Popover.Root modal>
      <Popover.Trigger className="rounded-b-lg flex items-center gap-2 bg-lime px-4 py-2 font-bold">
        <RiLeafLine size={22} />
        <Text>
          {co2Consumption.co2} g of CO<sub>2</sub>
        </Text>
      </Popover.Trigger>
      <Popover.Content
        className="max-w-md space-y-6 rounded-3xl bg-lime p-10 sm:max-w-xl"
        sideOffset={40}
      >
        <Popover.Close className="focus:outline-none">
          <FiX size={24} />
        </Popover.Close>
        <div className="space-y-6">
          <Heading level="3">Website carbon footprint</Heading>
          <div className="space-y-4">
            <Text as="p">
              Everytime someone opens this website only{' '}
              <strong>{co2Consumption.co2} g of CO2</strong> are produced. This
              site is{' '}
              <strong>cleaner than {co2Consumption.cleanerThan} %</strong> of
              web pages tested on the{' '}
              <Link url="https://www.websitecarbon.com" external>
                Website Carbon Calculator
              </Link>
              .
            </Text>
            <p>What we considered to make this page as clean as possible:</p>
            <ul className="list-outside list-disc space-y-2">
              <li>Reduce information to text</li>
              <li>Use static page generation</li>
              <li>Serve from edge CDN</li>
              <li>Self-host optimized font file in modern file format</li>
              <li>Focus on page speed</li>
            </ul>
          </div>
          <div className="flex gap-4 font-bold">
            <FiArrowRight size={24} />
            <Link url="https://www.websitecarbon.com" external>
              Website Carbon Calculator
            </Link>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
