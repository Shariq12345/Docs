"use client";
import React, { useRef, useState } from "react";
import { useSearchParam } from "@/hooks/use-search-param";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";

export const SearchInput = () => {
  const [search, setSearch] = useSearchParam();
  const [value, setValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    setSearch("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex items-center justify-center w-full py-4">
      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
        <div className="relative">
          <Input
            value={value}
            onChange={handleChange}
            ref={inputRef}
            placeholder="Search documents, files, and more..."
            className="
              pl-14 pr-14 
              h-[52px] 
              text-base 
              border-2 
              border-neutral-200 
              bg-white 
              shadow-sm 
              rounded-xl 
              focus-visible:border-primary-500 
              focus-visible:ring-2 
              focus-visible:ring-primary-200 
              transition-all 
              duration-300 
              ease-in-out
              placeholder:text-neutral-500
            "
          />
          <Button
            type="submit"
            variant="ghost"
            className="
              absolute 
              left-3 
              top-1/2 
              -translate-y-1/2 
              text-neutral-600 
              hover:text-primary-600 
              transition-colors
            "
          >
            <SearchIcon className="size-5" />
          </Button>
          {value && (
            <Button
              onClick={handleClear}
              type="button"
              variant="ghost"
              className="
                absolute 
                right-3 
                top-1/2 
                -translate-y-1/2 
                text-neutral-600 
                hover:text-primary-600 
                transition-colors
              "
            >
              <XIcon className="size-5" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
