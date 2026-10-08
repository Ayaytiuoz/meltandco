import type { Metadata } from "next";
import { FlavorCard } from "@/components/flavor-card";
import { PageIntro } from "@/components/page-intro";
import { getByCategory } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "NYC Cookies",
  description: "Cookies NYC épais, chunky et fondants. Classic, double chocolat et chocolat blanc, livrés au Maroc.",
};

export default function CookiesPage() {
  const cookies = getByCategory("cookies");
  return (
    <>
      <PageIntro
        eyebrow="Freshly baked"
        title="NYC Cookies"
        text="Épais, généreux, croustillants à l’extérieur et incroyablement fondants à l’intérieur."
      />
      <div className="mx-auto max-w-[1100px] space-y-20 px-5 pb-24 sm:px-8">
        {cookies.map((product, index) => (
          <FlavorCard key={product.id} product={product} flip={index % 2 === 1} />
        ))}
      </div>
    </>
  );
}
