import type { Category } from "@/lib/types";

export const categories: {
  id: Category;
  name: string;
  href: string;
  mood: string;
  emoji: string;
}[] = [
  { id: "cookies", name: "NYC Cookies", href: "/cookies", mood: "Cookie", emoji: "🍪" },
  { id: "brownies", name: "Brownies", href: "/brownies", mood: "Chocolat", emoji: "🍫" },
  { id: "tiramisu", name: "Tiramisu", href: "/tiramisu", mood: "Tiramisu", emoji: "☕" },
  { id: "boxes", name: "Boxes", href: "/#boxes", mood: "Box", emoji: "🤎" },
];
