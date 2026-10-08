import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  theme = "dark",
  compact = false,
  className,
}: {
  theme?: "dark" | "light";
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex flex-col items-center leading-none",
        theme === "light" ? "text-cream" : "text-chocolate",
        className,
      )}
    >
      <span className="font-serif text-[1.55rem] tracking-tight sm:text-[1.7rem]">
        Melt <span className="italic text-caramel">&</span> Co.
      </span>
      {compact ? null : (
        <span className="mt-1 text-[0.58rem] uppercase tracking-[0.42em]">Made to melt.</span>
      )}
    </Link>
  );
}
