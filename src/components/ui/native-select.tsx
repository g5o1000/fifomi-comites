import * as React from "react";
import { ChevronDownIcon } from "lucide-react@0.487.0";
import { cn } from "./utils";

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  size?: "sm" | "default";
  children?: React.ReactNode;
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "border-input data-[placeholder]:text-muted-foreground text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer",
            size === "default" && "h-9",
            size === "sm" && "h-8",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-4 opacity-50 pointer-events-none" />
      </div>
    );
  }
);

NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
