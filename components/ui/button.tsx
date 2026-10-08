import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-[0.16em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-cocoa text-cream hover:bg-chocolate",
        secondary: "border border-chocolate/20 bg-transparent text-chocolate hover:border-chocolate/50 hover:bg-white",
        light: "bg-cream text-cocoa hover:bg-white",
        ghost: "bg-transparent text-chocolate hover:bg-chocolate/5",
      },
      size: {
        sm: "h-10 px-4 text-[0.68rem]",
        md: "h-12 px-6 text-[0.72rem]",
        lg: "h-14 px-8 text-[0.75rem]",
        icon: "h-11 w-11 p-0 tracking-normal",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild = false, type, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      type={asChild ? undefined : (type ?? "button")}
      {...props}
    />
  );
}
