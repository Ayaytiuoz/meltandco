"use client";

import { useState } from "react";
import { AddToCart } from "@/components/add-to-cart";
import { QuantitySelector } from "@/components/quantity-selector";
import { formatPrice } from "@/lib/utils";

export function PurchasePanel({
  productId,
  price,
  compareAt,
  stock,
}: {
  productId: string;
  price: number;
  compareAt?: number;
  stock: number | null;
}) {
  const max = stock ?? 12;
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-6">
      <p className="font-serif text-4xl">
        {formatPrice(price)}
        {compareAt ? <span className="ml-3 text-lg text-milk line-through">{formatPrice(compareAt)}</span> : null}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <QuantitySelector value={quantity} max={max} onChange={setQuantity} />
        <div className="min-w-48 flex-1">
          <AddToCart productId={productId} quantity={quantity} disabled={stock === 0} />
        </div>
      </div>
    </div>
  );
}
