import { LucideFolderInput, StarIcon } from "lucide-react";
import React from "react";
import { BsCloudCheck } from "react-icons/bs";

export const DocumentInput = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg px-1.5 cursor-pointer truncate">
        Untitled Document
      </span>
      <StarIcon className="size-4 mb-[0.5px] mr-2" />
      <LucideFolderInput className="size-4 mr-2" />
      <BsCloudCheck className="size-4"/>
    </div>
  );
};
