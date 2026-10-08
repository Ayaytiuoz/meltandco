import type { Badge as BadgeId } from "@/lib/types";
import { cn } from "@/lib/utils";

const labels: Record<BadgeId, string> = {
  "best-seller": "Best Seller",
  "freshly-baked": "Freshly baked",
  "best-value": "Best value",
  share: "À partager… ou pas",
};

const tones: Record<BadgeId, string> = {
  "best-seller": "bg-cocoa text-cream",
  "freshly-baked": "bg-cream/95 text-chocolate",
  "best-value": "bg-caramel text-cocoa",
  share: "bg-blush text-chocolate",
};

export function Badge({ id, className }: { id: BadgeId; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.62rem] uppercase tracking-[0.16em]",
        tones[id],
        className,
      )}
    >
      {labels[id]}
    </span>
  );
}
