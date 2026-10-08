import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { PageIntro } from "@/components/page-intro";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Livraison, conservation, allergènes et commandes Melt & Co.",
};

export default function FaqPage() {
  return (
    <>
      <PageIntro eyebrow="Questions" title="FAQ" text="Le pratique, sans le discours." />
      <div className="mx-auto max-w-[760px] px-5 pb-24 sm:px-8">
        <FaqList items={faq} />
      </div>
    </>
  );
}
