"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export function AddToCart({
  productId,
  quantity = 1,
  className,
  label = "Ajouter au panier",
  disabled = false,
  size = "md",
  variant = "primary",
}: {
  productId: string;
  quantity?: number;
  className?: string;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "light" | "ghost";
}) {
  const add = useCart((state) => state.add);

  return (
    <Button
      size={size}
      variant={variant}
      className={cn("w-full", className)}
      disabled={disabled}
      onClick={() => add(productId, quantity)}
    >
      {label}
    </Button>
  );
}
