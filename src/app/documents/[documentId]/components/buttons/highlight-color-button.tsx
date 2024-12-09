import { LabelTooltip } from "@/components/label-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
import React from "react";
import { CirclePicker, type ColorResult } from "react-color";
import { FaHighlighter } from "react-icons/fa6";

export const HighlightColorButton = () => {
  const COLOR_PALETTE = [
    "#000000",
    "#434343",
    "#666666",
    "#999999",
    "#FFFFFF", // Grayscale
    "#FFEBEE",
    "#FFCDD2",
    "#E57373",
    "#F44336",
    "#D32F2F", // Reds
    "#FFF3E0",
    "#FFE0B2",
    "#FFB74D",
    "#FF9800",
    "#F57C00", // Oranges
    "#FFFDE7",
    "#FFF59D",
    "#FFEB3B",
    "#FBC02D",
    "#F57F17", // Yellows
    "#E8F5E9",
    "#C8E6C9",
    "#81C784",
    "#4CAF50",
    "#388E3C", // Greens
    "#E3F2FD",
    "#90CAF9",
    "#64B5F6",
    "#2196F3",
    "#1565C0", // Blues
    "#EDE7F6",
    "#D1C4E9",
    "#9575CD",
    "#673AB7",
    "#4527A0", // Purples
    "#FCE4EC",
    "#F8BBD0",
    "#F06292",
    "#E91E63",
    "#AD1457", // Pinks
  ];
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#FFFFFF";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <LabelTooltip
          content="Highlight Color"
          side="bottom"
          align="center"
          delayDuration={0}
        >
          <button
            className="
              flex flex-col items-center justify-between 
              min-w-7 h-8 px-2 py-2 rounded-md 
              hover:bg-neutral-200/80  
              focus:outline-none
              transition-all duration-200
            "
          >
            <FaHighlighter className="size-4" />
          </button>
        </LabelTooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <CirclePicker
          colors={COLOR_PALETTE}
          circleSpacing={5}
          color={value}
          onChange={onChange}
          circleSize={20}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
