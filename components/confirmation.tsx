"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getOrder } from "@/lib/orders";
import { formatPrice } from "@/lib/utils";
import { orderToWhatsapp, whatsappHref } from "@/lib/whatsapp";
import type { Order } from "@/lib/types";

export function Confirmation({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOrder(orderId ? (getOrder(orderId) ?? null) : null);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [orderId]);

  if (order === undefined) {
    return <div className="min-h-[50vh] pt-32" />;
  }

  if (!order) {
    return (
      <div className="px-5 pb-24 pt-32 text-center">
        <h1 className="font-serif text-5xl">Commande introuvable</h1>
        <Link href="/" className="mt-6 inline-block underline">
          Retour à l’accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[680px] px-5 pb-24 pt-32 text-center sm:px-8">
      <p className="text-[0.72rem] uppercase tracking-[0.32em] text-caramel">Made to melt.</p>
      <h1 className="mt-3 font-serif text-5xl">C’est noté, {order.customer.firstName}.</h1>
      <p className="mt-4 text-milk">
        Commande {order.id}. On prépare {formatPrice(order.total)} de gourmandise pour {order.customer.city}.
      </p>
      <ul className="mx-auto mt-8 max-w-md space-y-2 text-left text-sm">
        {order.items.map((item) => (
          <li key={item.productId} className="flex justify-between gap-4">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{formatPrice(item.unitPrice * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={whatsappHref(orderToWhatsapp(order))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-full bg-cocoa px-6 text-[0.72rem] uppercase tracking-[0.16em] text-cream"
        >
          Envoyer sur WhatsApp
        </a>
        <Link href="/" className="inline-flex h-12 items-center justify-center rounded-full border border-chocolate/20 px-6 text-[0.72rem] uppercase tracking-[0.16em]">
          Retour
        </Link>
      </div>
    </div>
  );
}
