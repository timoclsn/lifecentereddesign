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
                <div className="flex items-center justify-between pt-12">
                    <ul className="flex space-x-8">
                        <li className="font-bold hover:underline">
                            <Link href="/">
                                <a>Life Centered Design.Net</a>
                            </Link>
                        </li>
                        <li className="hover:underline">
                            <Link href="/#about">
                                <a>About</a>
                            </Link>
                        </li>
                        <li className="hover:underline">
                            <Link href="/#newsletter">
                                <a>Newsletter</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </CenteredColumn>
        </header>
    );
}
