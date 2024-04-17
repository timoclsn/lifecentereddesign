import { cva } from 'cva';
import { Bleed, Container } from '@/design-system';
import Image from 'next/image';
import { ReactNode } from 'react';
import forestImg from './forest.jpg';

export const inputStyles = cva({
  base: 'px-10 py-6 text-2xl text-text-secondary bg-ghost-main-dark-bg outline-none w-full ring-inset',
  variants: {
    error: {
      true: 'ring-2 ring-red-700',
      false: 'focus-visible:ring-2 focus-visible:ring-ghost-contrast-text',
    },
  },
});

export const checkboxStyles = cva({
  base: 'flex size-[25px] items-center justify-center bg-ghost-main-dark-bg outline-none ring-inset flex-none',
  variants: {
    error: {
      true: 'ring-2 ring-red-700',
      false: 'focus-visible:ring-2 focus-visible:ring-ghost-contrast-text',
    },
  },
});

export const errorStyles =
  'absolute left-0 bottom-0 -mb-6 text-red-700 text-sm slide-in-from-top-full duration-100 ease-in-out fade-in animate-in';

interface Props {
  children: ReactNode;
  id?: string;
}

export const ForrestSection = ({ children, id }: Props) => {
  return (
    <Bleed>
      <section id={id} className="relative overflow-hidden bg-[#EDF4EE]">
        <Image
          src={forestImg}
          alt="Image of a foggy forest."
          placeholder="blur"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <Container inset className="relative py-28">
          {children}
        </Container>
      </section>
    </Bleed>
  );
};
