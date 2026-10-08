"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ProductGrid } from "@/components/product-grid";
import { getByCategory } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

const moods: { id: Category; label: string; emoji: string }[] = [
  { id: "cookies", label: "Cookie", emoji: "🍪" },
  { id: "brownies", label: "Chocolat", emoji: "🍫" },
  { id: "tiramisu", label: "Tiramisu", emoji: "☕" },
];

export function MoodPicker() {
  const [mood, setMood] = useState<Category>("cookies");
  const products = getByCategory(mood);

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-[0.72rem] uppercase tracking-[0.32em] text-caramel">Selon l’heure</p>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Ton envie du moment ?</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-3" role="tablist" aria-label="Choisir une envie">
          {moods.map((item) => {
            const selected = mood === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setMood(item.id)}
                className={cn(
                  "h-16 rounded-full border text-[0.78rem] uppercase tracking-[0.16em] transition",
                  selected ? "border-cocoa bg-cocoa text-cream" : "border-chocolate/15 bg-white text-chocolate",
                )}
              >
                <span aria-hidden className="mr-2">
                  {item.emoji}
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={mood}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-12"
          >
            <ProductGrid products={products} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
