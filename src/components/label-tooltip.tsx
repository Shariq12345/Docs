import { TooltipArrow } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

export const LabelTooltip = ({
  children,
  content,
  className,
  side = "top",
  align = "center",
  delayDuration = 300,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
}) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={cn(
            "z-50 rounded-md bg-neutral-800 px-2 py-1.5 text-xs text-white shadow-md",
            "animate-in fade-in-50 data-[side=top]:slide-in-from-bottom-1 data-[side=bottom]:slide-in-from-top-1",
            "data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1",
            className
          )}
        >
          {content}
          <TooltipArrow className="fill-neutral-800" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
