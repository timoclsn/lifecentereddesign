import * as Dialog from '@radix-ui/react-dialog';
import { Heading, Link, Text } from 'design-system';
import { FiArrowRight, FiX } from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri';
import type { CO2 } from '../../lib/co2';
import styles from './CO2Badge.module.css';

interface Props {
  co2Consumption: CO2;
}

export function CO2Badge({ co2Consumption }: Props) {
  return (
    <Dialog.Root modal>
      <Dialog.Trigger
        className={`rounded-b-lg flex items-center gap-1 bg-lime px-4 py-2 font-bold ${styles.trigger}`}
      >
        <RiLeafLine size={22} />
        <Text>
          <span className="font-bold">{co2Consumption.co2} g</span> of CO
          <sub>2</sub>
        </Text>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed inset-0 bg-text-primary opacity-20 z-20 ${styles.overlay}`}
        />
        <Dialog.Content
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-lime p-10 w-[90vw] max-w-xl max-h-[85vh] overflow-y-auto z-20 ${styles.content}`}
        >
          <div className="mb-4">
            <Dialog.Close className="focus:outline-none hover:opacity-80">
              <FiX size={24} />
            </Dialog.Close>
          </div>
          <div>
            <Heading level="3" className="mb-4">
              Website carbon footprint
            </Heading>
            <div className="prose text-text-primary">
              <p>
                Everytime someone opens this website{' '}
                <strong>{co2Consumption.co2} g of CO2</strong> are produced.
                This site is{' '}
                <strong>cleaner than {co2Consumption.cleanerThan} %</strong> of
                web pages tested on the{' '}
                <Link url="https://www.websitecarbon.com" external>
                  Website Carbon Calculator
                </Link>
                .
              </p>
              <p>What we considered to make this page as clean as possible:</p>
              <ul>
                <li>Focus on text (instead of video or audio)</li>
                <li>Use static page generation</li>
                <li>Serve from edge CDN</li>
                <li>Self-host optimized font file in modern file format</li>
                <li>Focus on page speed</li>
              </ul>
            </div>
            <div className="flex gap-4 font-bold mt-4">
              <FiArrowRight size={24} />
              <Link url="https://www.websitecarbon.com" external>
                Website Carbon Calculator
              </Link>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
