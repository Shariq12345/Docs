import React, { useState } from "react";
import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LabelTooltip } from "@/components/label-tooltip";

export const LinkButton = () => {
  const { editor } = useEditorStore();

  const [value, setValue] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger>
        <LabelTooltip
          content="Insert Link"
          side="bottom"
          align="center"
          delayDuration={0}
        >
          <button
            className="
              flex flex-col items-center justify-between 
              min-w-7 h-8 px-2 py-2 rounded-md 
              hover:bg-neutral-200/80  
              transition-all duration-200
            "
          >
            <Link2Icon className="size-4" />
          </button>
        </LabelTooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)} size="sm" className="h-8">
          Insert
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
