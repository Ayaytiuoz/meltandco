import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/cookies", "/brownies", "/tiramisu", "/about", "/contact", "/faq", "/livraison", "/editions"];
  const now = new Date();
  return [
    ...paths.map((path) => ({
      url: `${siteConfig.siteUrl}${path || "/"}`,
      lastModified: now,
    })),
    ...getProducts().map((product) => ({
      url: `${siteConfig.siteUrl}/products/${product.slug}`,
      lastModified: now,
    })),
  ];
}
