import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/lib/config";
import { whatsappHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Écrire à Melt & Co. pour une commande, une box ou une question.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="On est là" title="Contact" text="Une box, une question, une envie précise. Écrivez-nous." />
      <div className="mx-auto grid max-w-[1100px] gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-2">
        <ContactForm />
        <aside className="space-y-4 rounded-[1.6rem] bg-beige p-8">
          <p className="font-serif text-3xl">Le plus simple</p>
          <a href={whatsappHref(siteConfig.whatsappGreeting)} className="block text-milk underline-offset-4 hover:underline">
            WhatsApp
          </a>
          <a href={siteConfig.instagram.url} className="block text-milk underline-offset-4 hover:underline">
            {siteConfig.instagram.handle}
          </a>
          <p className="text-sm text-milk">
            Atelier à {siteConfig.studio.city}, {siteConfig.studio.country}.
          </p>
        </aside>
      </div>
    </>
  );
}
