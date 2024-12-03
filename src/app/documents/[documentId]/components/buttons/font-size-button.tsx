import React, { useState } from "react";
import { useEditorStore } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { LabelTooltip } from "@/components/label-tooltip";

export const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);

    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();

      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;

    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <LabelTooltip
        content="Decrease font size"
        side="bottom"
        align="center"
        delayDuration={0}
      >
        <button
          onClick={decrement}
          className="
        flex items-center justify-center 
        w-7 h-7 px-2 py-2 rounded-md 
        hover:bg-neutral-200/80 
        "
        >
          <MinusIcon className="size-4" />
        </button>
      </LabelTooltip>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="text-sm w-10 h-7 rounded-md text-center  border border-neutral-400 bg-transparent focus:outline-none focus:ring-0
            "
        />
      ) : (
        <LabelTooltip
          content="Font size"
          side="bottom"
          align="center"
          delayDuration={0}
        >
          <button
            onClick={() => {
              setIsEditing(true);
              setFontSize(currentFontSize);
            }}
            className="text-sm w-10 h-7 rounded-md text-center border border-neutral-400 bg-transparent hover:bg-neutral-200/80
          "
          >
            {currentFontSize}
          </button>
        </LabelTooltip>
      )}
      <LabelTooltip
        content="Increase font size"
        side="bottom"
        align="center"
        delayDuration={0}
      >
        <button
          onClick={increment}
          className="
        flex items-center justify-center 
        w-7 h-7 px-2 py-2 rounded-md 
        hover:bg-neutral-200/80 
        "
        >
          <PlusIcon className="size-4" />
        </button>
      </LabelTooltip>
    </div>
  );
};
