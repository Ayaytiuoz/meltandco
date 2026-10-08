import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/lib/config";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Livraison",
  description: "Villes desservies, frais et délais de livraison Melt & Co. au Maroc.",
};

export default function DeliveryPage() {
  return (
    <>
      <PageIntro
        eyebrow="Livraison 🇲🇦"
        title="Vos gourmandises arrivent directement chez vous."
        text={`Livraison offerte dès ${formatPrice(siteConfig.freeDeliveryFrom)}. Les tarifs se règlent dans la configuration, pas dans le design.`}
      />
      <div className="mx-auto grid max-w-[1100px] gap-4 px-5 pb-24 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {siteConfig.deliveryZones.map((zone) => (
          <article key={zone.id} className="rounded-[1.4rem] bg-white p-6">
            <h2 className="font-serif text-3xl">{zone.city}</h2>
            <p className="mt-3 text-2xl">{formatPrice(zone.fee)}</p>
            <p className="mt-1 text-sm text-milk">{zone.delay}</p>
          </article>
        ))}
      </div>
    </>
  );
}
