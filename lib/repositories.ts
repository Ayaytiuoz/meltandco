import type { Order, OrderStatus, Product } from "@/lib/types";

/**
 * Contrats pour le futur dashboard.
 * Le site lit aujourd’hui data/products.ts et localStorage.
 * Brancher Supabase = implémenter ces deux interfaces, sans toucher à l’UI.
 */
export interface CatalogRepository {
  listProducts(): Promise<Product[]>;
  upsertProduct(product: Product): Promise<void>;
  setAvailability(id: string, available: boolean): Promise<void>;
  updatePrice(id: string, price: number): Promise<void>;
  updateStock(id: string, stock: number): Promise<void>;
}

export interface OrderRepository {
  listOrders(): Promise<Order[]>;
  updateStatus(id: string, status: OrderStatus): Promise<void>;
}

export interface OfferRepository {
  setDeliveryFee(zoneId: string, fee: number): Promise<void>;
  setPromoActive(code: string, active: boolean): Promise<void>;
}
