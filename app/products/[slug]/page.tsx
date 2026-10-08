import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/badge";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { PurchasePanel } from "@/components/purchase-panel";
import { getProduct, getProducts, getRelated } from "@/lib/catalog";
import { siteConfig } from "@/lib/config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produit" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} · Melt & Co.`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelated(product);

  return (
    <article className="px-5 pb-24 pt-28 sm:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: product.gallery.map((src) => `${siteConfig.siteUrl}${src}`),
          brand: { "@type": "Brand", name: siteConfig.name },
          offers: {
            "@type": "Offer",
            priceCurrency: "MAD",
            price: product.price,
            availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: `${siteConfig.siteUrl}/products/${product.slug}`,
          },
        }}
      />
      <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-beige">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {product.gallery.length > 1 ? (
            <div className="grid grid-cols-3 gap-3">
              {product.gallery.map((src) => (
                <div key={src} className="relative aspect-square overflow-hidden rounded-2xl bg-beige">
                  <Image src={src} alt="" fill className="object-cover" sizes="160px" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {product.badges.map((badge) => (
              <Badge key={badge} id={badge} />
            ))}
          </div>
          <h1 className="mt-4 font-serif text-5xl">{product.name}</h1>
          <p className="mt-4 max-w-md text-lg text-milk">{product.description}</p>
          <p className="mt-3 text-sm text-milk">Un seul ? Vous êtes sûrs ? 👀</p>
          <PurchasePanel productId={product.id} price={product.price} compareAt={product.compareAt} stock={product.stock} />
          <div className="mt-8">
            <h2 className="text-[0.72rem] uppercase tracking-[0.16em] text-caramel">Ingrédients</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.ingredients.map((item) => (
                <li key={item} className="rounded-full bg-white px-3 py-1 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-milk">
            <span className="text-chocolate">Allergènes. </span>
            {product.allergens.join(", ")}.
          </p>
          {product.serves ? <p className="mt-2 text-sm text-milk">{product.serves}</p> : null}
        </div>
      </div>
      {related.length ? (
        <div className="mx-auto mt-20 max-w-[1100px]">
          <h2 className="font-serif text-3xl">À côté, dans la vitrine</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
          <Link href={`/${product.category === "boxes" ? "#boxes" : product.category}`} className="mt-8 inline-block text-sm underline underline-offset-4">
            Retour à la catégorie
          </Link>
        </div>
      ) : null}
    </article>
  );
}
