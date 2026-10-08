import Image from "next/image";
import Link from "next/link";
import { AddToCart } from "@/components/add-to-cart";
import { Badge } from "@/components/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

function Media({ product }: { product: Product }) {
  if (product.collage) {
    return (
      <div className="grid h-full grid-cols-2 grid-rows-2">
        {product.gallery.slice(0, 3).map((src, index) => (
          <div key={src} className={index === 0 ? "relative col-span-2" : "relative"}>
            <Image src={src} alt="" fill className="object-cover" sizes="240px" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Image
      src={product.image}
      alt={product.name}
      fill
      className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
      sizes="(max-width: 768px) 80vw, 320px"
    />
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-beige shadow-[0_18px_50px_rgba(58,33,24,0.08)]">
        <Link href={`/products/${product.slug}`} className="absolute inset-0" aria-label={product.name}>
          <Media product={product} />
        </Link>
        {product.badges[0] ? (
          <span className="pointer-events-none absolute left-4 top-4 z-10">
            <Badge id={product.badges[0]} />
          </span>
        ) : null}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 hidden translate-y-2 opacity-0 transition duration-500 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 md:block">
          <AddToCart productId={product.id} />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="font-serif text-[1.65rem] leading-tight">
          <Link href={`/products/${product.slug}`} className="hover:text-caramel">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-milk">{product.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm">
            <span className="font-medium">{formatPrice(product.price)}</span>
            {product.compareAt ? (
              <span className="ml-2 text-milk/70 line-through">{formatPrice(product.compareAt)}</span>
            ) : null}
          </p>
          <div className="md:hidden">
            <AddToCart productId={product.id} size="sm" className="w-auto px-4" />
          </div>
        </div>
      </div>
    </article>
  );
}
