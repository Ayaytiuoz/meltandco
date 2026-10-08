"use client";

import Image from "next/image";
import { useState } from "react";
import { AddToCart } from "@/components/add-to-cart";
import { Badge } from "@/components/badge";
import { QuantitySelector } from "@/components/quantity-selector";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function FlavorCard({ product, flip = false }: { product: Product; flip?: boolean }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <article className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <div className={flip ? "md:order-2" : undefined}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-beige shadow-[0_24px_60px_rgba(58,33,24,0.1)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <Badge key={badge} id={badge} />
          ))}
        </div>
        <h3 className="mt-4 font-serif text-4xl">{product.name}</h3>
        <p className="mt-3 max-w-md text-milk leading-relaxed">{product.description}</p>
        <p className="mt-5 text-[0.72rem] uppercase tracking-[0.16em] text-caramel">Ingrédients</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {product.ingredients.map((item) => (
            <li key={item} className="rounded-full bg-white px-3 py-1 text-sm text-milk">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-milk">Allergènes : {product.allergens.join(", ")}.</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="font-serif text-3xl">{formatPrice(product.price)}</p>
          <QuantitySelector value={quantity} max={product.stock ?? 12} onChange={setQuantity} />
        </div>
        <div className="mt-5 max-w-xs">
          <AddToCart productId={product.id} quantity={quantity} />
        </div>
      </div>
    </article>
  );
}
