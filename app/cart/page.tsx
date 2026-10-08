import type { Metadata } from "next";
import { CartSummary } from "@/components/cart-summary";

export const metadata: Metadata = {
  title: "Panier",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-[760px] px-5 pb-24 pt-32 sm:px-8">
      <h1 className="font-serif text-5xl">Panier</h1>
      <p className="mt-2 text-milk">Ajoutez un peu de bonheur. Ou un peu plus.</p>
      <div className="mt-8 overflow-hidden rounded-[1.6rem] bg-white shadow-[0_16px_40px_rgba(58,33,24,0.05)]">
        <CartSummary checkout />
      </div>
    </div>
  );
}
