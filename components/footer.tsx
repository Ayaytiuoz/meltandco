import Link from "next/link";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/config";
import { whatsappHref } from "@/lib/whatsapp";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/cookies", label: "Nos produits" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
  { href: "/livraison", label: "Livraison" },
  { href: "/faq", label: "FAQ" },
  { href: "/editions", label: "Éditions limitées" },
];

export function Footer() {
  return (
    <footer className="border-t border-chocolate/10 bg-offwhite px-5 py-16 sm:px-8">
      <div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-milk">
            Des desserts généreux, préparés en petite quantité, pour fondre un peu.
          </p>
        </div>
        <nav className="grid content-start gap-3 text-sm" aria-label="Pied de page">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="w-fit text-milk hover:text-chocolate">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="grid content-start gap-3 text-sm">
          <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className="w-fit text-milk hover:text-chocolate">
            Instagram {siteConfig.instagram.handle}
          </a>
          <a
            href={whatsappHref(siteConfig.whatsappGreeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-milk hover:text-chocolate"
          >
            WhatsApp
          </a>
          <p className="mt-6 text-milk">Fait avec 🤎 au Maroc</p>
        </div>
      </div>
    </footer>
  );
}
