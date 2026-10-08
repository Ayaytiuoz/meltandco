import type { Metadata } from "next";
import { Countdown } from "@/components/countdown";
import { FlavorForm } from "@/components/flavor-form";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Éditions limitées",
  description: "Les prochaines saveurs Melt & Co. Proposez la vôtre.",
};

export default function EditionsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Bientôt"
        title="Une nouvelle saveur arrive… 👀"
        text="Quelle saveur voulez-vous voir ensuite ?"
      />
      <div className="mx-auto max-w-[720px] px-5 pb-24 sm:px-8">
        <Countdown target={siteConfig.countdownTarget} />
        <FlavorForm />
        <a href={siteConfig.instagram.url} className="mt-8 inline-block text-sm text-milk underline underline-offset-4">
          Ou dites-le sur {siteConfig.instagram.handle}
        </a>
      </div>
    </>
  );
}
