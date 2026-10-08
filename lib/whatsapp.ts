import { siteConfig } from "@/lib/config";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/types";

export function whatsappHref(message: string) {
  const phone = siteConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function orderToWhatsapp(order: Order) {
  const lines = order.items
    .map((item) => `• ${item.name} × ${item.quantity} — ${formatPrice(item.unitPrice * item.quantity)}`)
    .join("\n");

  return [
    "Bonjour Melt & Co. 🤎",
    `Je confirme ma commande ${order.id}.`,
    "",
    lines,
    "",
    `Sous-total : ${formatPrice(order.subtotal)}`,
    order.discount ? `Réduction : −${formatPrice(order.discount)}` : "",
    `Livraison (${order.customer.city}) : ${order.deliveryFee === 0 ? "offerte" : formatPrice(order.deliveryFee)}`,
    `Total : ${formatPrice(order.total)}`,
    "",
    `${order.customer.firstName} ${order.customer.lastName}`,
    order.customer.phone,
    `${order.customer.address}, ${order.customer.city}`,
    order.customer.instructions ? `Instructions : ${order.customer.instructions}` : "",
    order.note ? `Note : ${order.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
