'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { SkillsIcons } from '@/data/picturesandicons';

export default function HoverTooltip({
  item,
  children,
}: {
  item: SkillsIcons;
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
