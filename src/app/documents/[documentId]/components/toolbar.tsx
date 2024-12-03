"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { FontFamilyButton } from "./buttons/font-family-button";
import { HeadingLevelButton } from "./buttons/heading-level-button";
import { TextColorButton } from "./buttons/text-color-button";
import { HighlightColorButton } from "./buttons/highlight-color-button";
import { LinkButton } from "./buttons/link-button";
import { ImageButton } from "./buttons/image-button";
import { AlignButton } from "./buttons/align-button";
import { ListButton } from "./buttons/list-button";
import { FontSizeButton } from "./buttons/font-size-button";
import { LabelTooltip } from "@/components/label-tooltip";
import { LineHeightButton } from "./buttons/line-height-button";
import { MdFormatBold } from "react-icons/md";
import { MdFormatItalic } from "react-icons/md";
import { MdFormatUnderlined } from "react-icons/md";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon | React.ComponentType | React.ElementType;
  label: string;
}

const ToolbarButton = ({
  icon: Icon,
  isActive,
  onClick,
  label,
}: ToolbarButtonProps) => {
  return (
    <LabelTooltip
      content={label}
      side="bottom"
      align="center"
      delayDuration={0}
    >
      <button
        className={cn(
          "group relative text-sm h-8 w-8 flex items-center justify-center rounded-md",
          "hover:bg-neutral-100 transition-colors duration-200",
          "focus:ring-2 focus:ring-blue-500/50",
          isActive && "bg-blue-100 text-blue-600"
        )}
        onClick={onClick}
      >
        <Icon
          className="size-4 text-neutral-600 group-hover:text-neutral-900 
          transition-colors duration-200"
        />
        <span className="sr-only">{label}</span>
      </button>
    </LabelTooltip>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: MdFormatBold,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: MdFormatItalic,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: MdFormatUnderlined,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => {
          console.log("Comment");
        },
      },
      {
        label: "List todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div
      className="bg-white border border-neutral-200 rounded-lg shadow-sm 
      px-2 py-1 flex items-center gap-x-1 overflow-x-auto 
      max-w-full w-full scrollbar-thin scrollbar-thumb-neutral-300"
    >
      <div className="flex items-center gap-x-1">
        {sections[0].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
      </div>

      <Separator className="h-6 mx-1.5 bg-neutral-300" orientation="vertical" />

      <div className="flex items-center gap-x-1">
        <FontFamilyButton />
        <Separator
          className="h-6 mx-1.5 bg-neutral-300"
          orientation="vertical"
        />
        <HeadingLevelButton />
        <Separator
          className="h-6 mx-1.5 bg-neutral-300"
          orientation="vertical"
        />
        <FontSizeButton />
        <Separator
          className="h-6 mx-1.5 bg-neutral-300"
          orientation="vertical"
        />
      </div>

      <div className="flex items-center gap-x-1">
        {sections[1].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        <TextColorButton />
        <HighlightColorButton />
      </div>

      <Separator className="h-6 mx-1.5 bg-neutral-300" orientation="vertical" />

      <div className="flex items-center gap-x-1">
        <LinkButton />
        <ImageButton />
        <AlignButton />
        <LineHeightButton />
        <ListButton />
      </div>

      <Separator className="h-6 mx-1.5 bg-neutral-300" orientation="vertical" />

      <div className="flex items-center gap-x-1">
        {sections[2].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
};
