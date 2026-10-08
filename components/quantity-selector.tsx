"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 24,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex h-11 items-center rounded-full border border-chocolate/15 bg-white">
      <button
        type="button"
        className="grid h-11 w-11 place-items-center rounded-full text-chocolate disabled:opacity-30"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuer la quantité"
      >
        <Minus className="size-4" />
      </button>
      <span className="min-w-6 text-center text-sm" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="grid h-11 w-11 place-items-center rounded-full text-chocolate disabled:opacity-30"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Augmenter la quantité"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
