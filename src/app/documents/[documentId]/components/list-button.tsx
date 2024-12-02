import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
import { ListIcon, ListOrderedIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LabelTooltip } from "@/components/label-tooltip";

export const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Numbered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  // Determine the currently active list type
  const activeList = lists.find(({ isActive }) => isActive()) || lists[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <LabelTooltip
          content="List Type"
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
            aria-label="List Type"
          >
            <activeList.icon
              className={cn(
                "w-5 h-5",
                activeList.isActive() ? "text-blue-500" : "text-neutral-600"
              )}
            />
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
        {lists.map(({ label, icon: Icon, onClick, isActive }) => (
          <LabelTooltip
            key={label}
            content={label}
            side="bottom"
            align="center"
          >
            <button
              key={label}
              onClick={onClick}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full",
                "hover:bg-neutral-200/80",
                isActive() && "bg-neutral-200"
              )}
              aria-label={label}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isActive() ? "text-blue-500" : "text-neutral-600"
                )}
              />
            </button>
          </LabelTooltip>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
