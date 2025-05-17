'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Heading, Link, Text } from '@/design-system';
import { track } from '@/lib/tracking';
import { ArrowRight, Leaf, X } from 'lucide-react';
import { useState } from 'react';
import styles from './CO2Badge.module.css';

interface Props {
  co2: number;
  cleanerThan: number;
}

export const CO2Badge = ({ co2, cleanerThan }: Props) => {
  const [open, setOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    if (open) {
      track('Open CO2 Badge');
    }
    setOpen(open);
  };
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger className="group bg-lime animate-in slide-in-from-top-full flex items-center gap-1 rounded-b-lg px-4 py-2 font-bold transition-transform duration-200 ease-in-out">
        <Leaf
          size={22}
          className="transition-transform group-hover:scale-110"
        />
        <Text>
          <span className="font-bold">{co2} g</span> of CO
          <sub>2</sub>
        </Text>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-text-primary animate-in fade-in fixed inset-0 z-20 opacity-20" />
        <Dialog.Content
          aria-describedby={undefined}
          className={`bg-lime fixed top-1/2 left-1/2 z-20 max-h-[85vh] w-[90vw] max-w-xl overflow-y-auto rounded-3xl p-10 ${styles.content}`}
        >
          <div className="mb-4">
            <Dialog.Close className="hover:opacity-80 focus:outline-hidden">
              <X size={24} />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">
            Website carbon footprint
          </Dialog.Title>
          <Heading level="3">Website carbon footprint</Heading>

          <div className="prose text-text-primary">
            <p>
              Everytime someone opens this website{' '}
              <strong>{co2} g of CO2</strong> are produced. This site is{' '}
              <strong>cleaner than {cleanerThan} %</strong> of web pages tested
              on the{' '}
              <Link url="https://www.websitecarbon.com" external>
                Website Carbon Calculator
              </Link>
              .
            </p>
            <p>What we considered to make this page as clean as possible:</p>
            <ul>
              <li>Focus on text (instead of video or audio)</li>
              <li>Server rendered and streamed to the browser</li>
              <li>Serve from edge CDN</li>
              <li>Self-host optimized font file in modern file format</li>
              <li>Focus on page speed and Core Web Vitals</li>
            </ul>
          </div>
          <div className="mt-4 flex gap-4 font-bold">
            <ArrowRight size={24} />
            <Link url="https://www.websitecarbon.com" external>
              Website Carbon Calculator
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
