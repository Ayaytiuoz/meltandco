"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart-store";
import { useProfile } from "@/lib/profile-store";

const ReadyContext = createContext(false);

export function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void Promise.all([useCart.persist.rehydrate(), useProfile.persist.rehydrate()]).then(() =>
      setReady(true),
    );
  }, []);

  return <ReadyContext.Provider value={ready}>{children}</ReadyContext.Provider>;
}

export function useStoreReady() {
  return useContext(ReadyContext);
}
