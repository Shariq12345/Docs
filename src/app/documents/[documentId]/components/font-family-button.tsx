import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ChevronDownIcon } from "lucide-react";

type FontCategory =
  | "Standard"
  | "Serif"
  | "Monospace"
  | "Modern"
  | "Casual"
  | "System"
  | "Fallback";

interface Font {
  label: string;
  value: string;
  category: FontCategory;
}

export const FontFamilyButton: React.FC = () => {
  // Type-safe editor store hook
  const { editor } = useEditorStore();

  // Strongly typed fonts array
  const fonts: Font[] = [
    // Standard Fonts
    { label: "Arial", value: "Arial", category: "Standard" },
    { label: "Helvetica", value: "Helvetica", category: "Standard" },
    { label: "Arial Black", value: "Arial Black", category: "Standard" },
    { label: "Verdana", value: "Verdana", category: "Standard" },
    { label: "Geneva", value: "Geneva", category: "Standard" },
    { label: "Tahoma", value: "Tahoma", category: "Standard" },

    // Serif Fonts
    { label: "Times New Roman", value: "Times New Roman", category: "Serif" },
    { label: "Georgia", value: "Georgia", category: "Serif" },
    { label: "Palatino", value: "Palatino", category: "Serif" },
    { label: "Baskerville", value: "Baskerville", category: "Serif" },
    { label: "Cambria", value: "Cambria", category: "Serif" },

    // Monospace Fonts
    { label: "Courier New", value: "Courier New", category: "Monospace" },
    { label: "Courier", value: "Courier", category: "Monospace" },
    { label: "Lucida Console", value: "Lucida Console", category: "Monospace" },
    { label: "Monaco", value: "Monaco", category: "Monospace" },

    // Modern/Sans-Serif Fonts
    { label: "Inter", value: "Inter", category: "Modern" },
    { label: "Roboto", value: "Roboto", category: "Modern" },
    { label: "Open Sans", value: "Open Sans", category: "Modern" },
    { label: "Lato", value: "Lato", category: "Modern" },
    { label: "Source Sans Pro", value: "Source Sans Pro", category: "Modern" },

    // Casual Fonts
    { label: "Comic Sans MS", value: "Comic Sans MS", category: "Casual" },
    { label: "Brush Script MT", value: "Brush Script MT", category: "Casual" },

    // System Fonts
    { label: "System UI", value: "system-ui", category: "System" },
    { label: "Apple System", value: "-apple-system", category: "System" },
    { label: "Segoe UI", value: "Segoe UI", category: "System" },

    // Fallback Fonts
    { label: "Sans-serif", value: "sans-serif", category: "Fallback" },
    { label: "Serif", value: "serif", category: "Fallback" },
    { label: "Monospace", value: "monospace", category: "Fallback" },
  ];

  // Type-safe font categorization
  const fontCategories = fonts.reduce<Record<FontCategory, Font[]>>(
    (acc, font) => {
      if (!acc[font.category]) {
        acc[font.category] = [];
      }
      acc[font.category].push(font);
      return acc;
    },
    {} as Record<FontCategory, Font[]>
  );

  // Type-safe current font retrieval
  const currentFont = editor?.getAttributes("textStyle")?.fontFamily || "Arial";

  // Safe font selection handler
  const handleFontChange = (fontValue: string) => {
    if (editor) {
      editor.chain().focus().setFontFamily(fontValue).run();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
            flex items-center justify-between 
            w-[180px] h-8 
            px-3 py-1 
            border border-neutral-300 rounded-md 
            hover:bg-neutral-100 
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
            style={{ fontFamily: currentFont }}
          >
            {fonts.find((f) => f.value === currentFont)?.label || "Arial"}
          </span>
          <ChevronDownIcon
            className="
              ml-2 
              size-4 
              text-neutral-600 
              shrink-0
            "
          />
        </button>
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
        {(Object.entries(fontCategories) as Array<[FontCategory, Font[]]>).map(
          ([category, categoryFonts]) => (
            <div key={category} className="mb-2">
              <div
                className="
              text-xs 
              text-neutral-500 
              px-3 
              py-1.5 
              uppercase 
              tracking-wider
              border-b
            "
              >
                {category}
              </div>
              {categoryFonts.map(({ label, value }) => (
                <button
                  key={label}
                  className={cn(
                    `
                    flex items-center 
                    w-full 
                    px-3 py-2 
                    text-sm 
                    text-left 
                    hover:bg-neutral-100 
                    transition-colors 
                    duration-150
                  `,
                    currentFont === value
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-neutral-800"
                  )}
                  style={{ fontFamily: value }}
                  onClick={() => handleFontChange(value)}
                >
                  {label}
                  {currentFont === value && (
                    <span className="ml-auto text-blue-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
