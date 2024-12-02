import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LabelTooltip } from "@/components/label-tooltip";

export const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      value: "right",
      icon: AlignRightIcon,
    },
    {
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  // Determine the active alignment
  const activeAlignment =
    alignments.find(({ value }) => editor?.isActive({ textAlign: value })) ||
    alignments[0]; // Default to "left" if no alignment is active

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <LabelTooltip
          content="Text Alignment"
          side="bottom"
          align="center"
          delayDuration={0}
        >
          <button
            className="
          flex items-center justify-center 
          w-8 h-8
          rounded-md
          hover:bg-neutral-200/80 
          "
            aria-label="Text Alignment"
          >
            <activeAlignment.icon className="w-5 h-5 text-neutral-600" />
          </button>
        </LabelTooltip>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="
          p-2 
          bg-white 
          rounded-lg 
          shadow-xl 
          border border-neutral-200 
          flex flex-row gap-x-2
        "
      >
        {alignments.map(({ value, icon: Icon }) => (
          <LabelTooltip
            key={value}
            content={`Align ${value}`}
            side="bottom"
            align="center"
          >
            <button
              key={value}
              onClick={() => editor?.chain().focus().setTextAlign(value).run()}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full",
                "hover:bg-neutral-200/80",
                editor?.isActive({ textAlign: value }) && "bg-neutral-200"
              )}
              aria-label={`Align ${value}`}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  editor?.isActive({ textAlign: value })
                    ? "text-blue-500"
                    : "text-neutral-600"
                )}
              />
            </button>
          </LabelTooltip>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
