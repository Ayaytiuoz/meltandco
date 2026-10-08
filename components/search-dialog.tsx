"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { searchProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => (query.trim() ? searchProducts(query).slice(0, 6) : []), [query]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-cocoa/40 backdrop-blur-[2px]" />
        <Dialog.Content className="fixed left-1/2 top-[12vh] z-[80] w-[min(560px,calc(100%-2rem))] -translate-x-1/2 rounded-[1.6rem] bg-offwhite p-5 outline-none shadow-[0_24px_80px_rgba(36,19,15,0.18)]">
          <Dialog.Title className="font-serif text-2xl">Recherche</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-milk">Un cookie, un brownie, une envie.</Dialog.Description>
          <Input
            className="mt-4"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Classic, brownie, tiramisu…"
            aria-label="Rechercher un produit"
            autoFocus
          />
          <ul className="mt-4 max-h-80 space-y-2 overflow-y-auto">
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/products/${product.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-3 rounded-2xl p-2 hover:bg-beige/70"
                >
                  <span className="relative h-14 w-14 overflow-hidden rounded-xl bg-beige">
                    <Image src={product.image} alt="" fill className="object-cover" sizes="56px" />
                  </span>
                  <span>
                    <span className="block font-serif text-lg">{product.name}</span>
                    <span className="text-sm text-milk">{formatPrice(product.price)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {query.trim() && !results.length ? <p className="mt-4 text-sm text-milk">Rien pour cette envie. Pas encore.</p> : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
