"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { SearchDialog } from "@/components/search-dialog";
import { useStoreReady } from "@/components/providers";
import { useCart, useCartCount } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/cookies", label: "Nos cookies" },
  { href: "/brownies", label: "Brownies" },
  { href: "/tiramisu", label: "Tiramisu" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const setCartOpen = useCart((state) => state.setOpen);
  const count = useCartCount();
  const ready = useStoreReady();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition duration-500",
        scrolled ? "bg-cream/80 shadow-[0_8px_30px_rgba(58,33,24,0.05)] backdrop-blur-md" : "bg-cream/50 backdrop-blur-[6px]",
      )}
    >
      <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[0.68rem] uppercase tracking-[0.18em] text-milk transition hover:text-chocolate",
                pathname === link.href && "text-chocolate",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Logo className="justify-self-start lg:justify-self-center" />

        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            className="hidden h-11 w-11 place-items-center rounded-full lg:grid"
            aria-label="Rechercher"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="size-5" />
          </button>
          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-full"
            aria-label={ready && count ? `Ouvrir le panier, ${count} articles` : "Ouvrir le panier"}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="size-5" />
            {ready && count > 0 ? (
              <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cocoa px-1 text-[0.65rem] text-cream">
                {count}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full lg:hidden"
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-cocoa/30" />
          <Dialog.Content className="fixed inset-0 z-[80] flex flex-col bg-cream px-6 py-6 outline-none">
            <div className="flex items-center justify-between">
              <Dialog.Title className="font-serif text-2xl">Menu</Dialog.Title>
              <Dialog.Close className="grid h-11 w-11 place-items-center rounded-full" aria-label="Fermer le menu">
                <X className="size-5" />
              </Dialog.Close>
            </div>
            <nav className="mt-10 flex flex-col gap-5" aria-label="Navigation mobile">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="font-serif text-4xl" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-4">
              <button type="button" className="h-12 w-full rounded-full border border-chocolate/15" onClick={() => { setMenuOpen(false); setSearchOpen(true); }}>
                Recherche
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
