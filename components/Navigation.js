import Link from 'next/link';

import Button from '@/components/Button';
import CenteredColumn from '@/components/CenteredColumn';
import CO2Badge from '@/components/CO2Badge';

export default function Navigation({ co2Consumption }) {
    return (
        <header>
            <CenteredColumn>
                <div className="flex justify-center">
                    <CO2Badge co2Consumption={co2Consumption} />
                </div>
                <div className="flex items-center justify-between">
                    <ul className="flex py-12 space-x-8">
                        <li className="font-bold">
                            <Link href="/">
                                <a>Life Centered Design.Net</a>
                            </Link>
                        </li>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <a href="#newsletter">Newsletter</a>
                        </li>
                    </ul>
                    {/* <Button
                        text="Accessibility settings"
                        secondary
                        bgColor="bg-morning"
                    /> */}
                </div>
            </CenteredColumn>
        </header>
    );
}
