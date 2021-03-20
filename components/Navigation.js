import Link from 'next/link';

import CenteredColumn from '@/components/CenteredColumn';
import CO2Badge from '@/components/CO2Badge';

export default function Navigation({ co2Consumption }) {
    return (
        <header>
            <CenteredColumn>
                <div className="flex justify-center">
                    <CO2Badge co2Consumption={co2Consumption} />
                </div>
                <ul className="flex py-12 space-x-8">
                    <li className="font-bold">
                        <Link href="/">
                            <a>Life Centered Design.Net</a>
                        </Link>
                    </li>
                    <li>About</li>
                    <li>Newsletter</li>
                </ul>
            </CenteredColumn>
        </header>
    );
}
