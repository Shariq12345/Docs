import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ChevronDown } from "lucide-react";
import { type Level } from "@tiptap/extension-heading";
import { LabelTooltip } from "@/components/label-tooltip";

// Type definitions for improved type safety
interface HeadingOption {
  label: string;
  value: Level | 0;
  fontSize: string;
}

export const HeadingLevelButton: React.FC = () => {
  const { editor } = useEditorStore();

  // Strongly typed headings array
  const headings: HeadingOption[] = [
    { label: "Normal Text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "16px" },
    { label: "Heading 5", value: 5, fontSize: "14px" },
    { label: "Heading 6", value: 6, fontSize: "12px" },
  ];

  // Determine current heading with type-safe approach
  const currentHeading = (): string => {
    for (let level = 1; level <= 6; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal Text";
  };

  // Safe heading change handler
  const handleHeadingChange = (option: HeadingOption) => {
    if (!editor) return;

    if (option.value === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: option.value as Level })
        .run();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <LabelTooltip
          content="Styles"
          side="bottom"
          align="center"
          delayDuration={0}
        >
          <button
            className="
            flex items-center justify-between 
            w-[130px] h-8 
            px-3 py-1  rounded-md 
            hover:bg-neutral-200/80 
            focus:outline-none
            transition-all duration-200
          "
          >
            <span
              className="
              text-sm font-medium 
              truncate flex-grow 
              text-left
            "
            >
              {currentHeading()}
            </span>
            <ChevronDown
              className="
              ml-2 
              size-4 
              text-neutral-600 
              shrink-0
            "
            />
          </button>
        </LabelTooltip>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="
          w-[220px] 
          p-1 
          bg-white 
          border border-neutral-300 
          rounded-lg 
          shadow-lg 
          overflow-y-auto 
          max-h-[300px]
          custom-scrollbar
        "
      >
        {headings.map((option) => (
          <button
            key={option.value}
            className={cn(
              `
                flex items-center 
                w-full 
                px-3 py-2 
                text-left 
                hover:bg-neutral-100 
                transition-colors 
                duration-150
              `,
              (option.value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: option.value }) &&
                  "bg-blue-50 text-blue-700 font-semibold")
            )}
            style={{ fontSize: option.fontSize }}
            onClick={() => handleHeadingChange(option)}
          >
            {option.label}
            {((option.value === 0 && !editor?.isActive("heading")) ||
              editor?.isActive("heading", { level: option.value })) && (
              <span className="ml-auto text-blue-600">✓</span>
            )}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
