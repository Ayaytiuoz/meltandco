import type { Metadata } from "next";
import Image from "next/image";
import { AddToCart } from "@/components/add-to-cart";
import { getByCategory } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Brownies",
  description: "Brownies fudgy Melt & Co. : petit à 7 DH, grand à 15 DH.",
};

export default function BrowniesPage() {
  const brownies = getByCategory("brownies");

  return (
    <article className="bg-cocoa text-cream">
      <div className="mx-auto grid max-w-[1440px] pt-20 lg:grid-cols-2">
        <div className="relative min-h-[60vh]">
          <Image
            src="/images/products/brownie.jpg"
            alt="Brownies empilés, nappés de chocolat fondu"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-nude">Texture</p>
          <h1 className="mt-3 font-serif text-6xl">Brownies</h1>
          <p className="mt-4 font-serif text-2xl italic text-beige">Fudgy. Chocolaté. Irrésistible.</p>
          <p className="mt-5 max-w-md text-beige/90">Même recette. Deux tailles, selon l’envie.</p>
          <div className="mt-8 grid max-w-lg gap-4 sm:grid-cols-2">
            {brownies.map((brownie) => (
              <div key={brownie.id} className="rounded-[1.4rem] bg-white/10 p-5">
                <h2 className="font-serif text-3xl capitalize">{brownie.name.replace("Brownie ", "")}</h2>
                <p className="mt-2 text-sm text-beige/80">{brownie.description}</p>
                <p className="mt-4 font-serif text-3xl">{formatPrice(brownie.price)}</p>
                <p className="text-sm text-beige/70">la pièce</p>
                <div className="mt-4">
                  <AddToCart productId={brownie.id} variant="light" label="Ajouter" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
