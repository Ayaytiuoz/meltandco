import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-2xl border border-chocolate/15 bg-white px-4 py-3 text-base text-chocolate outline-none transition placeholder:text-milk/50 focus:border-caramel",
        className,
      )}
      {...props}
    />
  );
}
