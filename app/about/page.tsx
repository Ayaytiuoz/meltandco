import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Notre histoire",
  description: "Melt & Co. est né d’une envie simple : des desserts généreux, réconfortants et beaux à regarder.",
};

const values = [
  { title: "Petite quantité", text: "On cuit ce qu’on peut aimer le jour même. Pas plus." },
  { title: "Beaucoup de chocolat", text: "Des morceaux visibles. Une texture qui fond." },
  { title: "Tout simple", text: "De bons ingrédients, une lumière douce, et c’est déjà beaucoup." },
];

export default function AboutPage() {
  return (
    <article className="px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-caramel">Notre histoire</p>
          <h1 className="mt-3 font-serif text-5xl leading-[0.95] sm:text-6xl">Fait pour fondre, pas pour l’usine.</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-milk">
            <p>
              Melt & Co. est né d’une envie très simple : des desserts généreux, réconfortants, et impossibles à faire défiler sans s’arrêter.
            </p>
            <p>
              Des cookies épais, un brownie qui colle un peu aux doigts, un tiramisu qui sent le café. Préparés à la main, au Maroc, en petite fournée.
            </p>
            <p>Pas une chaîne. Une table, du beurre, et l’idée que le premier regard doit déjà donner faim.</p>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-beige">
          <Image
            src="/images/products/chunky.jpg"
            alt="Cookie très épais à la fleur de sel, cœur tendre"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
      <div className="mx-auto mt-16 grid max-w-[1100px] gap-6 md:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="rounded-[1.4rem] bg-white p-6">
            <h2 className="font-serif text-2xl">{value.title}</h2>
            <p className="mt-2 text-milk">{value.text}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
