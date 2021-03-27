import * as Popover from '@radix-ui/react-popover';
import { FiArrowRight, FiX } from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri';

export default function CO2Badge({ co2Consumption }) {
    return (
        <Popover.Root>
            <Popover.Trigger className="flex items-center px-4 py-2 space-x-2 font-bold bg-grass">
                <RiLeafLine size={22} />
                <span>
                    {co2Consumption.c} g of CO<sub>2</sub>
                </span>
            </Popover.Trigger>
            <Popover.Content
                className="max-w-xs px-6 py-10 space-y-6 sm:max-w-md bg-grass rounded-3xl"
                sideOffset={40}
                disableOutsidePointerEvents>
                <Popover.Close>
                    <FiX size={24} />
                </Popover.Close>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">
                        Website carbon footprint:
                    </h2>
                    <div className="space-y-4 text-dark">
                        <p>
                            Everytime someone opens this website only{' '}
                            <strong>{co2Consumption.c} g of CO2</strong> are
                            produced. This site is{' '}
                            <strong>cleaner than {co2Consumption.p} %</strong>{' '}
                            of web pages tested on Website Carbon Callculator.
                        </p>
                        <p>
                            What we considered to make this page as clean as
                            possible:
                        </p>
                        <ul className="list-disc list-inside">
                            <li>
                                Reduce information to text where possible – only
                                use images when they bring a real value
                            </li>
                            <li>Static page</li>
                        </ul>
                    </div>
                    <div className="flex space-x-4 text-dark">
                        <FiArrowRight size={24} />
                        <a
                            href="https://www.websitecarbon.com"
                            className="underline">
                            Website Carbon Calculator
                        </a>
                    </div>
                </div>
            </Popover.Content>
        </Popover.Root>
    );
}
