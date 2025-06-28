import type { PropsWithChildren, ReactNode } from 'react';

import {
  HoverCardTrigger,
  HoverCardContent,
  HoverCard as HoverCardUi
} from '../hover-card';
import { cn } from '@/shared/utils/tw-merge';

interface HoverCardProps {
  triggerContent?: ReactNode;
  className?: string;
}

export const HoverCard = ({
  children,
  className,
  triggerContent
}: PropsWithChildren<HoverCardProps>) => {
  return (
    <HoverCardUi>
      <HoverCardTrigger>{triggerContent}</HoverCardTrigger>

      <HoverCardContent
        className={cn(
          'w-fit bg-gray-700 border-white/5 backdrop-blur-md rounded-xl p-2 text-xs',
          className
        )}
      >
        {children}
      </HoverCardContent>
    </HoverCardUi>
  );
};
