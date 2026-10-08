import { siteConfig, type Promo } from "@/lib/config";
import type { Product } from "@/lib/types";

export type PricedLine = {
  product: Product;
  quantity: number;
};

export function findPromo(code: string): Promo | undefined {
  const normalized = code.trim().toLowerCase();
  if (!normalized) return undefined;
  return siteConfig.promos.find(
    (promo) => promo.active && promo.code.toLowerCase() === normalized,
  );
}

export function priceOrder(lines: PricedLine[], promoCode: string, cityId: string) {
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const promo = findPromo(promoCode);
  const promoApplies = Boolean(promo && subtotal >= promo.minSubtotal);
  const discount =
    promo && promoApplies
      ? promo.type === "percent"
        ? Math.round((subtotal * promo.value) / 100)
        : Math.min(promo.value, subtotal)
      : 0;
  const zone = siteConfig.deliveryZones.find((item) => item.id === cityId);
  const afterDiscount = Math.max(0, subtotal - discount);
  const deliveryFee = !zone
    ? 0
    : afterDiscount >= siteConfig.freeDeliveryFrom
      ? 0
      : zone.fee;
  const total = afterDiscount + (zone ? deliveryFee : 0);
  const amountUntilFree =
    zone && deliveryFee > 0 ? Math.max(0, siteConfig.freeDeliveryFrom - afterDiscount) : 0;

  return {
    subtotal,
    discount,
    deliveryFee,
    total,
    zone,
    promo: promoApplies ? promo : undefined,
    promoInvalid: Boolean(promoCode.trim()) && !promoApplies,
    amountUntilFree,
  };
}
