import Image from "next/image";
import Link from "next/link";
import { Countdown } from "@/components/countdown";
import { FeaturedCookie } from "@/components/featured-cookie";
import { FlavorCard } from "@/components/flavor-card";
import { Hero } from "@/components/hero";
import { InstagramGrid } from "@/components/instagram-grid";
import { MoodPicker } from "@/components/mood-picker";
import { Newsletter } from "@/components/newsletter";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { ReviewCarousel } from "@/components/review-carousel";
import { AddToCart } from "@/components/add-to-cart";
import { getByCategory, getProduct, getSpotlight } from "@/lib/catalog";
import { siteConfig } from "@/lib/config";
import { formatPrice } from "@/lib/utils";

export default function HomePage() {
  const spotlight = getSpotlight();
  const cookies = getByCategory("cookies");
  const browniePetit = getProduct("brownie-petit");
  const brownieGrand = getProduct("brownie-grand");
  const tiramisu = getProduct("tiramisu");
  const boxes = getByCategory("boxes");

  return (
    <>
      <Hero />
      <div className="overflow-hidden border-y border-chocolate/10 bg-beige/70 py-3">
        <div className="marquee-track flex w-max">
          {Array.from({ length: 2 }).map((_, index) => (
            <p key={index} className="px-4 text-[0.72rem] uppercase tracking-[0.28em] text-milk" aria-hidden={index === 1}>
              Made to melt · Fait frais · Ultra gourmand · Livré au Maroc · Attention, risque de craquage ·
            </p>
          ))}
        </div>
      </div>

      <section id="incontournables" className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.32em] text-caramel">La carte courte</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-6xl">Nos incontournables</h2>
            <p className="mt-3 text-milk">Ceux qu’on ne peut tout simplement pas oublier. 🤎</p>
          </Reveal>
          <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {spotlight.map((product) => (
              <div key={product.id} className="min-w-[78%] snap-start sm:min-w-[46%] lg:min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cookies" className="bg-offwhite px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-caramel">La signature</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-6xl">NYC Cookies 🍪</h2>
          <p className="mt-4 max-w-xl text-lg text-milk">
            Épais, généreux, croustillants à l’extérieur et incroyablement fondants à l’intérieur.
          </p>
          <div className="mt-16 space-y-20">
            {cookies.map((product, index) => (
              <FlavorCard key={product.id} product={product} flip={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <FeaturedCookie />

      {browniePetit && brownieGrand ? (
        <section className="bg-cocoa text-cream">
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
            <div className="relative min-h-[68vh]">
              <Image
                src="/images/products/brownie-crumb.jpg"
                alt="Brownie fudgy, mie dense et chocolat qui coule"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16">
              <p className="text-[0.72rem] uppercase tracking-[0.32em] text-nude">Chocolat intense</p>
              <h2 className="mt-3 font-serif text-5xl sm:text-7xl">Brownies</h2>
              <p className="mt-4 font-serif text-2xl italic text-beige">Fudgy. Chocolaté. Irrésistible.</p>
              <p className="mt-5 max-w-md text-beige/90">Le petit pour une bouchée, le grand quand on ne négocie pas.</p>
              <div className="mt-8 grid max-w-md gap-3 sm:grid-cols-2">
                <div className="rounded-[1.4rem] bg-white/10 p-4">
                  <p className="font-serif text-2xl">Petit</p>
                  <p className="mt-1 text-beige">{formatPrice(browniePetit.price)} / pièce</p>
                  <div className="mt-4">
                    <AddToCart productId={browniePetit.id} variant="light" label="Ajouter" />
                  </div>
                </div>
                <div className="rounded-[1.4rem] bg-white/10 p-4">
                  <p className="font-serif text-2xl">Grand</p>
                  <p className="mt-1 text-beige">{formatPrice(brownieGrand.price)} / pièce</p>
                  <div className="mt-4">
                    <AddToCart productId={brownieGrand.id} variant="light" label="Ajouter" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {tiramisu ? (
        <section className="relative overflow-hidden bg-[#F3E6DC] px-5 py-20 sm:px-8 sm:py-28">
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 flex-col lg:flex">
            <span className="h-[18%] bg-[#4A2C22]" />
            <span className="h-[22%] bg-[#F7F0E8]" />
            <span className="h-[14%] bg-[#C4A484]" />
            <span className="h-[22%] bg-[#F7F0E8]" />
            <span className="h-[24%] bg-[#6B4030]" />
          </div>
          <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-2">
            <div className="lg:pl-10">
              <p className="text-[0.72rem] uppercase tracking-[0.32em] text-caramel">Douceur</p>
              <h2 className="mt-3 font-serif text-5xl sm:text-7xl">Tiramisu</h2>
              <p className="mt-4 font-serif text-2xl italic text-milk">Une douceur crémeuse, légère et réconfortante.</p>
              <p className="mt-5 max-w-md text-milk">{tiramisu.description}</p>
              <p className="mt-6 font-serif text-4xl">{formatPrice(tiramisu.price)}</p>
              <div className="mt-6 max-w-xs">
                <AddToCart productId={tiramisu.id} label="Commander" />
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-beige shadow-[0_24px_60px_rgba(58,33,24,0.08)]">
              <Image
                src="/images/products/tiramisu-verre.jpg"
                alt="Tiramisu en verrine, couches de crème mascarpone et cacao"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
      ) : null}

      <MoodPicker />

      <section id="boxes" className="bg-offwhite px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-serif text-4xl sm:text-6xl">Pourquoi choisir un seul ? 👀</h2>
          <p className="mt-3 max-w-lg text-milk">Des boxes pour la table, le bureau, ou une envie qui ne se discute pas.</p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {boxes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-[1100px] gap-8 rounded-[2rem] bg-beige px-6 py-12 sm:px-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl">Livraison 🇲🇦</h2>
            <p className="mt-3 text-milk">Vos gourmandises arrivent directement chez vous.</p>
            <ul className="mt-6 space-y-3">
              {siteConfig.deliveryZones.slice(0, 4).map((zone) => (
                <li key={zone.id} className="flex justify-between gap-4 border-b border-chocolate/10 pb-3 text-sm">
                  <span>{zone.city}</span>
                  <span className="text-milk">
                    {formatPrice(zone.fee)} · {zone.delay}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/livraison" className="mt-6 inline-block text-sm underline underline-offset-4">
              Toutes les villes
            </Link>
          </div>
          <p className="self-end font-serif text-3xl leading-snug">Made to melt. Made to love.</p>
        </div>
      </section>

      <ReviewCarousel />
      <InstagramGrid />

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-[1100px] rounded-[2rem] bg-white px-6 py-12 sm:px-12">
          <h2 className="font-serif text-4xl sm:text-5xl">Une nouvelle saveur arrive… 👀</h2>
          <p className="mt-3 text-milk">La prochaine fournée se prépare déjà.</p>
          <h3 className="mt-10 font-serif text-3xl">Votre prochain cookie ? 👀</h3>
          <p className="mt-3 max-w-lg text-milk">
            Red Velvet ? Pistache ? Kinder ? Lotus ? Chocolat blanc ? À vous de choisir.
          </p>
          <Countdown target={siteConfig.countdownTarget} />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/editions" className="inline-flex h-12 items-center rounded-full bg-cocoa px-6 text-[0.72rem] uppercase tracking-[0.16em] text-cream">
              Proposer une saveur
            </Link>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-chocolate/15 px-6 text-[0.72rem] uppercase tracking-[0.16em]"
            >
              {siteConfig.instagram.handle}
            </a>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
