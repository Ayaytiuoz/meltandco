"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductById } from "@/lib/catalog";
import type { CartLine } from "@/lib/types";

type CartState = {
  items: CartLine[];
  isOpen: boolean;
  note: string;
  promoCode: string;
  cityId: string;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  setNote: (note: string) => void;
  setPromoCode: (promoCode: string) => void;
  setCityId: (cityId: string) => void;
  clear: () => void;
  setOpen: (isOpen: boolean) => void;
};

function clampQuantity(productId: string, quantity: number) {
  const product = getProductById(productId);
  const max = product?.stock ?? 24;
  return Math.min(max, quantity);
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      note: "",
      promoCode: "",
      cityId: "",
      setOpen: (isOpen) => set({ isOpen }),
      setNote: (note) => set({ note }),
      setPromoCode: (promoCode) => set({ promoCode }),
      setCityId: (cityId) => set({ cityId }),
      clear: () => set({ items: [], note: "", promoCode: "", isOpen: false }),
      add: (productId, quantity = 1) => {
        const product = getProductById(productId);
        if (!product?.available) return;
        const items = get().items;
        const existing = items.find((item) => item.productId === productId);
        const nextQuantity = clampQuantity(productId, (existing?.quantity ?? 0) + quantity);
        const next = existing
          ? items.map((item) =>
              item.productId === productId ? { ...item, quantity: nextQuantity } : item,
            )
          : [...items, { productId, quantity: clampQuantity(productId, quantity) }];
        set({ items: next, isOpen: true });
      },
      remove: (productId) =>
        set({ items: get().items.filter((item) => item.productId !== productId) }),
      setQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().remove(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: clampQuantity(productId, quantity) }
              : item,
          ),
        });
      },
    }),
    {
      name: "melt-cart",
      skipHydration: true,
      partialize: (state) => ({
        items: state.items,
        note: state.note,
        promoCode: state.promoCode,
        cityId: state.cityId,
      }),
    },
  ),
);

export function useCartCount() {
  return useCart((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
}
