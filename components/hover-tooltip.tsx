'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function HoverTooltip({
  item,
  children,
}: {
  item: any;
  children: React.ReactNode;
}) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{item.alt}</TooltipContent>
      </Tooltip>
    </>
  );
}
