"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[100svh] max-w-[1440px] lg:grid-cols-12">
        <div className="relative order-1 min-h-[74svh] lg:order-2 lg:col-span-7 lg:min-h-[100svh]">
          <Image
            src="/images/products/classic.jpg"
            alt="Cookie NYC épais, irrégulier, avec de gros morceaux de chocolat fondant"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream via-cream/10 to-cream/70 lg:bg-gradient-to-r lg:from-cream lg:via-cream/10 lg:to-transparent" />
          <span aria-hidden className="absolute bottom-[18%] left-[8%] h-3 w-4 rotate-12 rounded-full bg-chocolate/80" />
          <span aria-hidden className="absolute right-[14%] top-[22%] h-2.5 w-3.5 -rotate-6 rounded-full bg-cocoa/70" />
          <span aria-hidden className="absolute bottom-[28%] right-[22%] h-2 w-3 rotate-45 rounded-full bg-caramel/90" />
        </div>

        <motion.div
          className="order-2 flex flex-col justify-end px-5 pb-14 pt-2 lg:order-1 lg:col-span-5 lg:justify-center lg:px-12 lg:pb-0 lg:pt-24"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[0.68rem] uppercase tracking-[0.42em] text-caramel">Made to melt.</p>
          <h1 className="mt-4 font-serif text-[3.15rem] leading-[0.92] text-chocolate sm:text-6xl lg:text-[5rem]">
            La gourmandise
            <br />
            <span className="italic">qui fond.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-milk sm:text-lg">
            NYC Cookies, brownies & tiramisu préparés avec amour pour vos plus belles envies.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#incontournables">Découvrir nos gourmandises</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/products/classic-nyc-cookie">Commander</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-milk">Fait frais · Ultra gourmand · Livraison au Maroc 🇲🇦</p>
        </motion.div>
      </div>
    </section>
  );
}
