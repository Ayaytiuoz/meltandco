import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-chocolate/15 bg-white px-4 text-base text-chocolate outline-none transition placeholder:text-milk/50 focus:border-caramel",
        className,
      )}
      {...props}
    />
  );
}
