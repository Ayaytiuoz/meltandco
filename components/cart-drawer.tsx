"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { X } from "lucide-react";
import { CartSummary } from "@/components/cart-summary";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";

export function CartDrawer() {
  const isOpen = useCart((state) => state.isOpen);
  const setOpen = useCart((state) => state.setOpen);
  const count = useCart((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-cocoa/40 backdrop-blur-[2px]" />
        <Dialog.Content className="fixed z-[80] flex flex-col bg-offwhite outline-none inset-x-0 bottom-0 max-h-[92vh] rounded-t-[1.75rem] shadow-[0_-20px_80px_rgba(36,19,15,0.18)] md:inset-y-0 md:left-auto md:right-0 md:h-full md:max-h-none md:w-[420px] md:rounded-none">
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-beige md:hidden" />
          <div className="flex items-center justify-between px-5 py-4">
            <Dialog.Title className="font-serif text-2xl">Votre panier</Dialog.Title>
            <Dialog.Description className="sr-only">
              {count} article{count > 1 ? "s" : ""} dans le panier
            </Dialog.Description>
            <Dialog.Close className="grid h-11 w-11 place-items-center rounded-full" aria-label="Fermer le panier">
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <CartSummary compact />
          {count > 0 ? (
            <div className="grid gap-3 px-5 pb-6">
              <Button asChild size="lg">
                <Link href="/checkout" onClick={() => setOpen(false)}>
                  Passer commande
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/cookies" onClick={() => setOpen(false)}>
                  Continuer
                </Link>
              </Button>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
