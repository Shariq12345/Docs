import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
import { HighlighterIcon } from "lucide-react";
import React from "react";
import { CirclePicker, type ColorResult } from "react-color";

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
      <DropdownMenuTrigger asChild>
        <button
          className="
              flex flex-col items-center justify-between 
              min-w-7 h-8 px-2 py-1.5 rounded-md 
              hover:bg-neutral-200/80  
              focus:outline-none
              transition-all duration-200
            "
        >
          <HighlighterIcon className="size-4" />
        </button>
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
