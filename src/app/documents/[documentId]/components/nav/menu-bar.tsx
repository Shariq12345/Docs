"use client";
import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  CircleAlertIcon,
  ClipboardIcon,
  ClipboardTypeIcon,
  CodeIcon,
  CopyIcon,
  DownloadIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FolderDownIcon,
  GlobeIcon,
  LayoutPanelTopIcon,
  MailIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  RotateCwIcon,
  ScissorsIcon,
  Share2Icon,
  TableIcon,
  TextIcon,
  Trash2Icon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatUnderlined,
} from "react-icons/md";
import { TbBrandGoogleDrive, TbSubscript, TbSuperscript } from "react-icons/tb";
import { TiDocumentText } from "react-icons/ti";
import { useEditorStore } from "@/store/use-editor-store";

const KeyboardShortcut = ({ children }: { children: React.ReactNode }) => {
  return (
    <kbd
      className="ml-auto inline-flex items-center gap-1 px-2 py-1 
      bg-gray-50 text-gray-800 text-xs font-medium 
      rounded-md border border-gray-200 shadow-sm 
      transition-all duration-200 
      hover:bg-gray-100 hover:shadow-md
      dark:bg-gray-700 dark:text-gray-200 
      dark:border-gray-600 dark:hover:bg-gray-600"
    >
      {children}
    </kbd>
  );
};

export const MenuBar = () => {
  const { editor } = useEditorStore();

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, `document.json`); //TODO: Add documet name
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], { type: "text/html" });
    onDownload(blob, `document.html`); //TODO: Add documet name
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], { type: "text/plain" });
    onDownload(blob, `document.txt`); //TODO: Add documet name
  };

  const insertTable = (
    { rows, cols }: { rows: number; cols: number } = { rows: 1, cols: 1 }
  ) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: true })
      .run();
  };

  return (
    <div className="flex">
      <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
        {/* FILE */}
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer">
            File
          </MenubarTrigger>
          <MenubarContent className="print:hidden">
            <MenubarSub>
              <MenubarSubTrigger>
                <TiDocumentText className="size-4 mr-2" />
                New
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Document</MenubarItem>
                <MenubarItem>From template gallery</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarItem>
              <FilePlusIcon className="size-4 mr-2" />
              New Document
            </MenubarItem>

            <MenubarSeparator />

            <MenubarSub>
              <MenubarSubTrigger>
                <Share2Icon className="size-4 mr-2" />
                Share
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Share with others</MenubarItem>
                <MenubarItem>Publish to web</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSub>
              <MenubarSubTrigger>
                <MailIcon className="size-4 mr-2" />
                Email
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email this file</MenubarItem>
                <MenubarItem>Email collaborators</MenubarItem>
                <MenubarItem>Email draft</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSub>
              <MenubarSubTrigger>
                <DownloadIcon className="size-4 mr-2" />
                Download
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={onSaveJSON}>
                  <FileJsonIcon className="size-4 mr-2" />
                  JSON
                </MenubarItem>
                <MenubarItem onClick={onSaveHTML}>
                  <GlobeIcon className="size-4 mr-2" />
                  HTML
                </MenubarItem>
                <MenubarItem onClick={() => window.print()}>
                  <BsFilePdf className="size-4 mr-2" />
                  PDF
                </MenubarItem>
                <MenubarItem onClick={onSaveText}>
                  <FileIcon className="size-4 mr-2" />
                  Text
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSeparator />

            <MenubarItem>
              <FilePenIcon className="size-4 mr-2" />
              Rename
            </MenubarItem>

            <MenubarItem>
              <FolderDownIcon className="size-4 mr-2" />
              Move
            </MenubarItem>

            <MenubarItem>
              <TbBrandGoogleDrive className="size-4 mr-2" />
              Add a shortcut to Drive
            </MenubarItem>

            <MenubarItem>
              <Trash2Icon className="size-4 mr-2" />
              Move to bin
            </MenubarItem>

            <MenubarSeparator />

            <MenubarSub>
              <MenubarSubTrigger>
                <RotateCwIcon className="size-4 mr-2" />
                Version History
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Name current version</MenubarItem>
                <MenubarItem>See version history</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSeparator />

            <MenubarItem>
              <CircleAlertIcon className="size-4 mr-2" />
              Details
            </MenubarItem>

            <MenubarSub>
              <MenubarSubTrigger>
                <GlobeIcon className="size-4 mr-2" />
                Language
              </MenubarSubTrigger>
            </MenubarSub>

            <MenubarItem className="w-[230px]">
              <LayoutPanelTopIcon className="size-4 mr-2" />
              Page Setup
            </MenubarItem>

            <MenubarItem onClick={() => window.print()}>
              <PrinterIcon className="size-4 mr-2" />
              Print
              <KeyboardShortcut>Ctrl + P</KeyboardShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* EDIT */}
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer">
            Edit
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
              <Undo2Icon className="size-4 mr-2" />
              Undo <KeyboardShortcut>⌘ Z</KeyboardShortcut>
            </MenubarItem>
            <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
              <Redo2Icon className="size-4 mr-2" />
              Redo <KeyboardShortcut>⌘ Y</KeyboardShortcut>
            </MenubarItem>

            <MenubarSeparator />

            <MenubarItem>
              <ScissorsIcon className="size-4 mr-2" />
              Cut <KeyboardShortcut>⌘ K</KeyboardShortcut>
            </MenubarItem>

            <MenubarItem>
              <CopyIcon className="size-4 mr-2" />
              Copy <KeyboardShortcut>⌘ C</KeyboardShortcut>
            </MenubarItem>

            <MenubarItem>
              <ClipboardIcon className="size-4 mr-2" />
              Paste <KeyboardShortcut>⌘ V</KeyboardShortcut>
            </MenubarItem>

            <MenubarItem>
              <ClipboardTypeIcon className="size-4 mr-2" />
              Paste without formatting
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* INSERT */}
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer">
            Insert
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>
                <TableIcon className="size-4 mr-2" />
                Table
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>
                  1 x 1
                </MenubarItem>
                <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>
                  2 x 2
                </MenubarItem>
                <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>
                  3 x 3
                </MenubarItem>
                <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>
                  4 x 4
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarItem
              onClick={() => editor?.chain().focus().toggleCode().run()}
            >
              <CodeIcon className="size-4 mr-2" />
              Code
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* FORMAT */}
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer">
            Format
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>
                <TextIcon className="size-4 mr-2" />
                Text
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  <MdFormatBold className="size-4 mr-2" />
                  Bold
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  <MdFormatItalic className="size-4 mr-2" />
                  Italic
                </MenubarItem>
                <MenubarItem
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                >
                  <MdFormatUnderlined className="size-4 mr-2" />
                  Underline
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                >
                  <MdFormatStrikethrough className="size-4 mr-2" />
                  Strikethrough
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().setSuperscript().run()}
                >
                  <TbSuperscript className="size-4 mr-2" />
                  Superscript
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().setSubscript().run()}
                >
                  <TbSubscript className="size-4 mr-2" />
                  Subscript
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem
              onClick={() => editor?.chain().focus().unsetAllMarks().run()}
            >
              <RemoveFormattingIcon className="size-4 mr-2" />
              Clear Formatting
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* TOOLS */}
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer">
            Tools
          </MenubarTrigger>
        </MenubarMenu>

        {/* EXTENSIONS */}
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer">
            Extensions
          </MenubarTrigger>
        </MenubarMenu>

        {/* HELP */}
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer">
            Help
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};
