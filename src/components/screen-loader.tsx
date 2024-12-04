import { Loader2 } from "lucide-react";
import React from "react";

interface ScreenLoaderProps {
  label?: string;
}

export const ScreenLoader = ({ label }: ScreenLoaderProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <Loader2 className="size-6 text-mutext-card-foreground animate-spin" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};
