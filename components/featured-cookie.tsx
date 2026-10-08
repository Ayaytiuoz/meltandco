"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AddToCart } from "@/components/add-to-cart";
import { getFeatured } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

const notes = ["Chunky", "Chocolate loaded", "Freshly baked"];

export function FeaturedCookie() {
  const product = getFeatured();
  const reduce = useReducedMotion();
  if (!product) return null;

  return (
    <section className="overflow-hidden px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-caramel">La signature</p>
          <h2 className="mt-3 font-serif text-4xl leading-[0.95] sm:text-6xl">Le cookie qui fait tout fondre.</h2>
          <p className="mt-5 max-w-sm text-milk">Impossible de résister. {product.description}</p>
          <p className="mt-6 font-serif text-3xl">{formatPrice(product.price)}</p>
          <div className="mt-6 max-w-xs">
            <AddToCart productId={product.id} label="Je le veux" />
          </div>
          <Link href={`/products/${product.slug}`} className="mt-4 inline-block text-sm text-milk underline-offset-4 hover:underline">
            Voir la fiche
          </Link>
        </div>
        <motion.div
          className="relative mx-auto w-full max-w-[540px]"
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-square overflow-hidden rounded-[46%_54%_50%_50%] bg-beige shadow-[0_30px_80px_rgba(58,33,24,0.12)]">
            <Image
              src={product.image}
              alt="Le cookie signature Melt & Co., épais et chargé de chocolat"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 540px"
            />
          </div>
          {notes.map((note, index) => (
            <span
              key={note}
              className={
                index === 0
                  ? "absolute left-0 top-8 rounded-full bg-white px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em] shadow-sm"
                  : index === 1
                    ? "absolute right-0 top-1/3 rounded-full bg-blush px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em]"
                    : "absolute bottom-8 left-4 rounded-full bg-cocoa px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-cream"
              }
            >
              {note}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
