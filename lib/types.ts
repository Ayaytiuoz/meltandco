export type Category = "cookies" | "brownies" | "tiramisu" | "boxes";

export type Badge =
  | "best-seller"
  | "freshly-baked"
  | "best-value"
  | "share";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: Category;
  description: string;
  price: number;
  compareAt?: number;
  image: string;
  gallery: string[];
  ingredients: string[];
  allergens: string[];
  badges: Badge[];
  available: boolean;
  featured: boolean;
  spotlight: boolean;
  collage?: boolean;
  stock: number | null;
  serves?: string;
};

export type Review = {
  id: string;
  name: string;
  city: string;
  text: string;
  rating: number;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type InstagramPost = {
  id: string;
  image: string;
  alt: string;
  href: string;
};

export type CartLine = {
  productId: string;
  quantity: number;
};

export type OrderStatus = "nouvelle" | "confirmee" | "en-preparation" | "livree" | "annulee";

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    address: string;
    instructions: string;
  };
  items: OrderItem[];
  note: string;
  promoCode: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  channel: "site" | "whatsapp";
};

export type InboxKind = "newsletter" | "contact" | "flavor";

export type InboxEntry = {
  id: string;
  kind: InboxKind;
  createdAt: string;
  payload: Record<string, string>;
};
