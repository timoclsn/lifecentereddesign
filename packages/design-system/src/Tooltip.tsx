import { ReactNode, useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface Props {
  children: ReactNode;
  content: string;
  delayDuration?: number;
  openOnClick?: boolean;
}

export const Tooltip = ({
  children,
  content,
  delayDuration = 0,
  openOnClick = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpenState = () => setIsOpen((value) => !value);
  const handleTriggerClick = () => toggleOpenState();
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        delayDuration={delayDuration}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <TooltipPrimitive.Trigger
          asChild
          onClick={openOnClick ? handleTriggerClick : undefined}
        >
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className="bg-primary-main-bg text-primary-contrast-text animate-in fade-in data-[state=delayed-open]:data-[side=top]:slide-in-from-bottom-[20px] data-[state=delayed-open]:data-[side=top]:zoom-in-75 z-50 max-w-xs rounded-md p-4 text-sm duration-150"
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
