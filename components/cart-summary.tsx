"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { QuantitySelector } from "@/components/quantity-selector";
import { Input } from "@/components/ui/input";
import { getProductById } from "@/lib/catalog";
import { siteConfig } from "@/lib/config";
import { useCart } from "@/lib/cart-store";
import { priceOrder } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";

export function CartSummary({
  compact = false,
  checkout = false,
}: {
  compact?: boolean;
  checkout?: boolean;
}) {
  const items = useCart((state) => state.items);
  const note = useCart((state) => state.note);
  const promoCode = useCart((state) => state.promoCode);
  const cityId = useCart((state) => state.cityId);
  const setNote = useCart((state) => state.setNote);
  const setPromoCode = useCart((state) => state.setPromoCode);
  const setCityId = useCart((state) => state.setCityId);
  const setQuantity = useCart((state) => state.setQuantity);
  const remove = useCart((state) => state.remove);

  const lines = items.flatMap((item) => {
    const product = getProductById(item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
  const priced = priceOrder(lines, promoCode, cityId);

  if (!lines.length) {
    return (
      <div className="grid flex-1 place-items-center px-6 py-16 text-center">
        <div>
          <p className="font-serif text-3xl">Votre cookie vous attend.</p>
          <p className="mt-3 text-milk">Le panier est encore tout doux, et vide.</p>
          <Link
            href="/cookies"
            className="mt-6 inline-flex h-12 items-center rounded-full bg-cocoa px-6 text-[0.72rem] uppercase tracking-[0.16em] text-cream"
          >
            Voir les cookies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ul className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5">
        {lines.map(({ product, quantity }) => (
          <li key={product.id} className="flex gap-4">
            <Link
              href={`/products/${product.slug}`}
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-beige"
            >
              <Image src={product.image} alt="" fill className="object-cover" sizes="80px" />
            </Link>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <Link href={`/products/${product.slug}`} className="font-serif text-xl leading-tight">
                  {product.name}
                </Link>
                <button type="button" onClick={() => remove(product.id)} aria-label={`Retirer ${product.name}`}>
                  <Trash2 className="size-4 text-milk" />
                </button>
              </div>
              <p className="mt-1 text-sm text-milk">{formatPrice(product.price)}</p>
              <div className="mt-3">
                <QuantitySelector
                  value={quantity}
                  min={0}
                  max={product.stock ?? 24}
                  onChange={(value) => setQuantity(product.id, value)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="space-y-4 border-t border-chocolate/10 px-5 py-5">
        {compact ? null : (
          <>
            <label className="block text-[0.72rem] uppercase tracking-[0.16em] text-milk" htmlFor="cart-city">
              Ville de livraison
            </label>
            <select
              id="cart-city"
              value={cityId}
              onChange={(event) => setCityId(event.target.value)}
              className="h-12 w-full rounded-2xl border border-chocolate/15 bg-white px-4 text-base"
            >
              <option value="">Choisir une ville</option>
              {siteConfig.deliveryZones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.city} · {formatPrice(zone.fee)}
                </option>
              ))}
            </select>
            <label className="block text-[0.72rem] uppercase tracking-[0.16em] text-milk" htmlFor="cart-promo">
              Code promo
            </label>
            <Input
              id="cart-promo"
              value={promoCode}
              onChange={(event) => setPromoCode(event.target.value)}
              placeholder="MELT10"
              autoCapitalize="characters"
            />
          </>
        )}
        <label className="block text-[0.72rem] uppercase tracking-[0.16em] text-milk" htmlFor="cart-note">
          Une note pour la fournée
        </label>
        <Input
          id="cart-note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Sans noix, message sur la box…"
        />

        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>Sous-total</dt>
            <dd>{formatPrice(priced.subtotal)}</dd>
          </div>
          {priced.discount ? (
            <div className="flex justify-between text-caramel">
              <dt>Réduction</dt>
              <dd>−{formatPrice(priced.discount)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between">
            <dt>Livraison</dt>
            <dd>
              {priced.zone
                ? priced.deliveryFee === 0
                  ? "Offerte"
                  : formatPrice(priced.deliveryFee)
                : "Selon la ville"}
            </dd>
          </div>
          <div className="flex justify-between border-t border-chocolate/10 pt-2 font-medium">
            <dt>Total</dt>
            <dd>{formatPrice(priced.total)}</dd>
          </div>
        </dl>
        {priced.amountUntilFree > 0 ? (
          <p className="text-sm text-milk">
            Plus que {formatPrice(priced.amountUntilFree)} pour la livraison offerte.
          </p>
        ) : null}
        {priced.promoInvalid ? (
          <p className="text-sm text-[#8A3E36]" role="alert">
            Ce code ne s’applique pas encore à ce panier.
          </p>
        ) : null}
        {checkout ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/cookies"
              className="inline-flex h-12 items-center justify-center rounded-full border border-chocolate/20 text-[0.72rem] uppercase tracking-[0.16em]"
            >
              Continuer
            </Link>
            <Link
              href="/checkout"
              className="inline-flex h-12 items-center justify-center rounded-full bg-cocoa text-[0.72rem] uppercase tracking-[0.16em] text-cream"
            >
              Passer commande
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
