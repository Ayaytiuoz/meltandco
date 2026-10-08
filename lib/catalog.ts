import { products } from "@/data/products";
import type { Category, Product } from "@/lib/types";

export function getProducts() {
  return products.filter((product) => product.available);
}

export function getAllProducts() {
  return products;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getByCategory(category: Category) {
  return getProducts().filter((product) => product.category === category);
}

export function getSpotlight() {
  return getProducts().filter((product) => product.spotlight);
}

export function getFeatured() {
  return getProducts().find((product) => product.featured) ?? getProducts()[0];
}

export function getRelated(product: Product) {
  return getProducts()
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);
}

export function searchProducts(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return getProducts();
  return getProducts().filter((product) => {
    const haystack = [product.name, product.description, product.category, ...product.ingredients]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}
