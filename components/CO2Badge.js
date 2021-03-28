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
                sideOffset={40}>
                <h3>Popover content</h3>
                <p>Are you sure you wanna do this?</p>
                <Popover.Close>Yes</Popover.Close>
                <Popover.Arrow />
            </Popover.Content>
        </Popover.Root>
    );
}
