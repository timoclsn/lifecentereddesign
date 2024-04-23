'use client';

import { CountUp } from "@/components/CountUp/CountUp";
import { useStorage } from "@/components/StorageProvider/StorageProvider";
import { countStyles } from "./utils";

interface Props {
  children: number;
}

export const ResourcesCountClient = ({ children }: Props) => {
  const {
    store: { resourcesCountFinished },
    setStorageValue,
  } = useStorage();

  return resourcesCountFinished ? (
    <span className={countStyles}>{children}</span>
  ) : (
    <CountUp
      onCountUpFinished={() => {
        setStorageValue('resourcesCountFinished', true);
      }}
      className={countStyles}
    >
      {children}
    </CountUp>
  );
};
