import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
// import { ListCollapseIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LabelTooltip } from "@/components/label-tooltip";
import { CgFormatLineHeight } from "react-icons/cg";

export const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    {
      label: "Default",
      value: "normal",
    },
    {
      label: "Single",
      value: "1",
    },
    {
      label: "1.15",
      value: "1.15",
    },
    {
      label: "1.5",
      value: "1.5",
    },
    {
      label: "Double",
      value: "2",
    },
  ];

  // Determine the active line height
  // const activeLineHeight =
  //   lineHeights.find(
  //     ({ value }) => editor?.getAttributes("paragraph").lineHeight === value
  //   ) || lineHeights[0];

  return (
    <DropdownMenu>
      {/* Trigger Button */}
      <DropdownMenuTrigger>
        <LabelTooltip
          content="Line Height"
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
            aria-label="Line Height"
          >
            <CgFormatLineHeight className="w-5 h-5 text-neutral-600" />
          </button>
        </LabelTooltip>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent
        className="
          p-2 
          bg-white 
          rounded-lg 
          shadow-xl 
          border border-neutral-200 
          flex flex-col gap-y-1
        "
      >
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2 rounded-md",
              "hover:bg-neutral-200/80",
              editor?.getAttributes("paragraph").lineHeight === value &&
                "bg-neutral-200"
            )}
          >
            <span
              className={cn(
                "text-sm font-medium",
                editor?.getAttributes("paragraph").lineHeight === value
                  ? "text-blue-500"
                  : "text-neutral-700"
              )}
            >
              {label}
            </span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
