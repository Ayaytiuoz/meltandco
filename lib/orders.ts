import type { InboxEntry, InboxKind, Order } from "@/lib/types";

const ORDERS_KEY = "melt-orders";
const INBOX_KEY = "melt-inbox";

function read<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? "[]") as T[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function listOrders() {
  return read<Order>(ORDERS_KEY);
}

export function getOrder(id: string) {
  return listOrders().find((order) => order.id === id);
}

export function saveOrder(order: Order) {
  const next = [order, ...listOrders().filter((item) => item.id !== order.id)];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
}

export function createOrderId() {
  const stamp = new Date();
  const day = `${stamp.getFullYear()}${String(stamp.getMonth() + 1).padStart(2, "0")}${String(stamp.getDate()).padStart(2, "0")}`;
  const n = Math.floor(1000 + Math.random() * 9000);
  return `MELT-${day}-${n}`;
}

export function saveInbox(kind: InboxKind, payload: Record<string, string>) {
  const entry: InboxEntry = {
    id: crypto.randomUUID(),
    kind,
    createdAt: new Date().toISOString(),
    payload,
  };
  localStorage.setItem(INBOX_KEY, JSON.stringify([entry, ...read<InboxEntry>(INBOX_KEY)]));
  return entry;
}
