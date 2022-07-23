import Link from 'next/link';

import type { CO2 } from '../lib/co2';
import { CenteredColumn } from './CenteredColumn';
import { CO2Badge } from './CO2Badge';

interface Props {
  co2Consumption: CO2;
}

export function Navigation({ co2Consumption }: Props) {
  return (
    <header>
      <CenteredColumn>
        <div className="flex justify-center">
          <CO2Badge co2Consumption={co2Consumption} />
        </div>
        <div className="flex items-center justify-between pt-12">
          <ul className="flex w-full gap-10">
            <li className="flex-1 font-bold hover:underline">
              <Link href="/">
                <a>Life Centered Design.Net</a>
              </Link>
            </li>
            <li className="font-bold hover:underline">
              <Link href="/#new-resources">
                <a>Resources</a>
              </Link>
            </li>
            <li className="font-bold hover:underline">
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </div>
      </CenteredColumn>
    </header>
  );
}
