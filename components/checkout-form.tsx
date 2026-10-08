"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStoreReady } from "@/components/providers";
import { getProductById } from "@/lib/catalog";
import { siteConfig } from "@/lib/config";
import { useCart } from "@/lib/cart-store";
import { createOrderId, saveOrder } from "@/lib/orders";
import { priceOrder } from "@/lib/pricing";
import { useProfile } from "@/lib/profile-store";
import { formatPrice } from "@/lib/utils";
import { orderToWhatsapp, whatsappHref } from "@/lib/whatsapp";
import type { Order } from "@/lib/types";

const schema = z.object({
  firstName: z.string().min(2, "Indiquez votre prénom"),
  lastName: z.string().min(2, "Indiquez votre nom"),
  phone: z.string().min(8, "Indiquez un téléphone"),
  cityId: z.string().min(1, "Choisissez une ville"),
  address: z.string().min(5, "Indiquez une adresse"),
  instructions: z.string().optional(),
  sendWhatsapp: z.boolean(),
});

type Values = z.infer<typeof schema>;

export function CheckoutForm() {
  const router = useRouter();
  const ready = useStoreReady();
  const items = useCart((state) => state.items);
  const note = useCart((state) => state.note);
  const promoCode = useCart((state) => state.promoCode);
  const cityId = useCart((state) => state.cityId);
  const clear = useCart((state) => state.clear);
  const setCityId = useCart((state) => state.setCityId);
  const profile = useProfile((state) => state.profile);
  const saveProfile = useProfile((state) => state.save);

  const lines = items.flatMap((item) => {
    const product = getProductById(item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      cityId: "",
      address: "",
      instructions: "",
      sendWhatsapp: true,
    },
  });

  const priced = priceOrder(lines, promoCode, cityId);

  useEffect(() => {
    if (!ready) return;
    const nextCity = profile.cityId || cityId;
    setValue("firstName", profile.firstName);
    setValue("lastName", profile.lastName);
    setValue("phone", profile.phone);
    setValue("address", profile.address);
    setValue("cityId", nextCity);
    if (nextCity && nextCity !== cityId) setCityId(nextCity);
  }, [ready, profile, cityId, setValue, setCityId]);

  if (!lines.length) {
    return (
      <div className="px-5 pb-24 pt-32 text-center">
        <h1 className="font-serif text-5xl">Le panier est vide.</h1>
        <p className="mt-3 text-milk">Ajoutez un peu de bonheur, puis revenez ici.</p>
        <Link href="/cookies" className="mt-8 inline-flex h-12 items-center rounded-full bg-cocoa px-6 text-[0.72rem] uppercase tracking-[0.16em] text-cream">
          Voir les cookies
        </Link>
      </div>
    );
  }

  function onSubmit(values: Values) {
    const zone = siteConfig.deliveryZones.find((item) => item.id === values.cityId);
    if (!zone) return;
    const totals = priceOrder(lines, promoCode, values.cityId);
    const order: Order = {
      id: createOrderId(),
      createdAt: new Date().toISOString(),
      status: "nouvelle",
      customer: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        city: zone.city,
        address: values.address,
        instructions: values.instructions ?? "",
      },
      items: lines.map((line) => ({
        productId: line.product.id,
        name: line.product.name,
        quantity: line.quantity,
        unitPrice: line.product.price,
      })),
      note,
      promoCode: totals.promo?.code ?? "",
      subtotal: totals.subtotal,
      discount: totals.discount,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      channel: values.sendWhatsapp ? "whatsapp" : "site",
    };
    saveOrder(order);
    saveProfile({
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      cityId: values.cityId,
      address: values.address,
    });
    clear();
    if (values.sendWhatsapp) {
      window.open(whatsappHref(orderToWhatsapp(order)), "_blank", "noopener,noreferrer");
    }
    router.push(`/checkout/confirmation?order=${order.id}`);
  }

  return (
    <div className="mx-auto grid max-w-[1100px] gap-12 px-5 pb-24 pt-32 lg:grid-cols-[1.1fr_0.9fr] sm:px-8">
      <div>
        <p className="text-[0.72rem] uppercase tracking-[0.32em] text-caramel">Checkout</p>
        <h1 className="mt-3 font-serif text-5xl">Presque à vous.</h1>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Prénom" htmlFor="firstName" error={errors.firstName?.message}>
              <Input id="firstName" autoComplete="given-name" {...register("firstName")} />
            </Field>
            <Field label="Nom" htmlFor="lastName" error={errors.lastName?.message}>
              <Input id="lastName" autoComplete="family-name" {...register("lastName")} />
            </Field>
          </div>
          <Field label="Téléphone" htmlFor="phone" error={errors.phone?.message}>
            <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
          </Field>
          <Field label="Ville" htmlFor="cityId" error={errors.cityId?.message}>
            <select
              id="cityId"
              className="h-12 w-full rounded-2xl border border-chocolate/15 bg-white px-4"
              {...register("cityId", {
                onChange: (event) => setCityId(event.target.value),
              })}
            >
              <option value="">Choisir une ville</option>
              {siteConfig.deliveryZones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.city}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Adresse" htmlFor="address" error={errors.address?.message}>
            <Textarea id="address" autoComplete="street-address" {...register("address")} />
          </Field>
          <Field label="Instructions de livraison" htmlFor="instructions">
            <Textarea id="instructions" {...register("instructions")} placeholder="Étage, code, un créneau…" />
          </Field>
          <label className="flex items-start gap-3 text-sm leading-relaxed">
            <input type="checkbox" className="mt-1 size-4 accent-[#3A2118]" {...register("sendWhatsapp")} />
            Envoyer aussi le récapitulatif sur WhatsApp
          </label>
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            Confirmer ma commande
          </Button>
          <p className="text-sm text-milk">Le paiement en ligne pourra se brancher ici, sans changer ce formulaire.</p>
        </form>
      </div>
      <aside className="h-fit rounded-[1.6rem] bg-white p-6 shadow-[0_16px_40px_rgba(58,33,24,0.05)]">
        <h2 className="font-serif text-2xl">Votre commande</h2>
        <ul className="mt-5 space-y-4">
          {lines.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-3">
              <span className="relative h-16 w-16 overflow-hidden rounded-xl bg-beige">
                <Image src={product.image} alt="" fill className="object-cover" sizes="64px" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-lg">{product.name}</span>
                <span className="text-sm text-milk">
                  {quantity} × {formatPrice(product.price)}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t border-chocolate/10 pt-4 text-sm">
          <div className="flex justify-between">
            <dt>Sous-total</dt>
            <dd>{formatPrice(priced.subtotal)}</dd>
          </div>
          {priced.discount ? (
            <div className="flex justify-between">
              <dt>Réduction</dt>
              <dd>−{formatPrice(priced.discount)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between">
            <dt>Livraison</dt>
            <dd>{priced.zone ? (priced.deliveryFee === 0 ? "Offerte" : formatPrice(priced.deliveryFee)) : "Selon la ville"}</dd>
          </div>
          <div className="flex justify-between pt-2 font-medium">
            <dt>Total</dt>
            <dd>{formatPrice(priced.zone ? priced.total : priced.subtotal - priced.discount)}</dd>
          </div>
        </dl>
        {note ? <p className="mt-4 text-sm text-milk">Note : {note}</p> : null}
      </aside>
    </div>
  );
}
