import { siteConfig } from "@/lib/config";
import type { InstagramPost } from "@/lib/types";

/**
 * Grille visuelle. Pour brancher le feed plus tard, remplacez ce tableau
 * par les médias renvoyés par l’API Instagram, même forme d’objet.
 */
export const instagramPosts: InstagramPost[] = [
  {
    id: "ig-classic",
    image: "/images/products/classic.jpg",
    alt: "Cookie NYC coupé, chocolat fondant et fleur de sel",
    href: siteConfig.instagram.url,
  },
  {
    id: "ig-double",
    image: "/images/products/double.jpg",
    alt: "Cookie double chocolat épais sur papier cuisson",
    href: siteConfig.instagram.url,
  },
  {
    id: "ig-red-velvet",
    image: "/images/products/red-velvet.jpg",
    alt: "Cookie red velvet aux éclats de chocolat blanc",
    href: siteConfig.instagram.url,
  },
  {
    id: "ig-pistache",
    image: "/images/products/pistache.jpg",
    alt: "Cookie à la pistache",
    href: siteConfig.instagram.url,
  },
  {
    id: "ig-brownie",
    image: "/images/products/brownie.jpg",
    alt: "Pile de brownies nappés de chocolat",
    href: siteConfig.instagram.url,
  },
  {
    id: "ig-tiramisu",
    image: "/images/products/tiramisu-verre.jpg",
    alt: "Tiramisu en verrines, cacao et crème",
    href: siteConfig.instagram.url,
  },
  {
    id: "ig-speculoos",
    image: "/images/products/speculoos.jpg",
    alt: "Cookie au spéculoos",
    href: siteConfig.instagram.url,
  },
];
