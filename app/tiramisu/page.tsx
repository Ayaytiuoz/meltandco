import type { Metadata } from "next";
import Image from "next/image";
import { AddToCart } from "@/components/add-to-cart";
import { getProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tiramisu",
  description: "Tiramisu Melt & Co. en pot, 25 DH. Mascarpone, café et cacao.",
};

export default function TiramisuPage() {
  const product = getProduct("tiramisu");
  if (!product) return null;

  return (
    <article className="bg-[#F3E6DC]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-caramel">Couches</p>
          <h1 className="mt-3 font-serif text-6xl">Tiramisu</h1>
          <p className="mt-4 font-serif text-2xl italic text-milk">Une douceur crémeuse, légère et réconfortante.</p>
          <p className="mt-5 text-milk">{product.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {product.ingredients.map((item) => (
              <li key={item} className="rounded-full bg-white px-3 py-1 text-sm">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-serif text-4xl">{formatPrice(product.price)}</p>
          <div className="mt-6 max-w-xs">
            <AddToCart productId={product.id} label="Commander" />
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-beige">
          <Image
            src={product.gallery[1] ?? product.image}
            alt="Tiramisu en verrines, crème et cacao"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </article>
  );
}
