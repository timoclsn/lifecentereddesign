'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Heading, Link, Text } from 'design-system';
import { ArrowRight, Leaf, X } from 'lucide-react';
import { demoResult } from '../../../lib/co2';
import styles from './CO2Badge.module.css';

export function CO2Badge() {
  const co2Consumption = demoResult;
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-lime group flex items-center gap-1 rounded-b-lg px-4 py-2 font-bold">
        <Leaf
          size={22}
          className="transition-transform group-hover:scale-110"
        />
        <Text>
          <span className="font-bold">{co2Consumption.co2} g</span> of CO
          <sub>2</sub>
        </Text>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-text-primary animate-in fade-in fixed inset-0 z-20 opacity-20" />
        <Dialog.Content
          className={`bg-lime fixed left-1/2 top-1/2 z-20 max-h-[85vh] w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl p-10 ${styles.content}`}
        >
          <div className="mb-4">
            <Dialog.Close className="hover:opacity-80 focus:outline-none">
              <X size={24} />
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
            <div className="mt-4 flex gap-4 font-bold">
              <ArrowRight size={24} />
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
