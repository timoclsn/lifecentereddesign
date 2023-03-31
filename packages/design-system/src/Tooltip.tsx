import { ReactNode } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface Props {
  children: ReactNode;
  content: string;
}

export const Tooltip = ({ children, content }: Props) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={0}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className="bg-primary-main-bg text-primary-contrast-text px-4 py-2 rounded-md text-sm animate-in fade-in duration-150 data-[state=delayed-open]:data-[side=top]:slide-in-from-bottom-[20px] data-[state=delayed-open]:data-[side=top]:zoom-in-75"
            sideOffset={5}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-bg-primary-main-bg" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
