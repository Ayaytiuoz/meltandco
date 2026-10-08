/**
 * Réglages de la marque.
 * Prix, villes, codes promo et numéro WhatsApp se changent ici —
 * rien n’est figé dans le design.
 *
 * WhatsApp : numéro international sans + ni espaces (212 + le mobile sans le 0).
 */
export const siteConfig = {
  name: "Melt & Co.",
  slogan: "Made to melt.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://meltandco.ma",
  locale: "fr_MA",
  description:
    "Découvrez Melt & Co., vos NYC Cookies, brownies et tiramisu ultra gourmands, préparés avec amour et livrés au Maroc.",
  title: "Melt & Co. | NYC Cookies, Brownies & Tiramisu au Maroc",
  instagram: {
    handle: "@melt_nd_co",
    url: "https://www.instagram.com/melt_nd_co",
  },
  whatsappNumber: "212701755639",
  whatsappGreeting: "Bonjour Melt & Co. 🤎\nJe souhaiterais passer une commande.",
  currency: "MAD",
  freeDeliveryFrom: 120,
  countdownTarget: "2026-11-15T18:00:00+01:00" as string | null,
  studio: {
    city: "Casablanca",
    country: "Maroc",
  },
  deliveryZones: [
    {
      id: "casablanca",
      city: "Casablanca",
      fee: 25,
      delay: "2 à 4 heures",
    },
    {
      id: "mohammedia",
      city: "Mohammédia",
      fee: 30,
      delay: "Le jour même",
    },
    {
      id: "bouskoura",
      city: "Bouskoura",
      fee: 30,
      delay: "Le jour même",
    },
    {
      id: "rabat",
      city: "Rabat",
      fee: 40,
      delay: "Sous 24 heures",
    },
    {
      id: "marrakech",
      city: "Marrakech",
      fee: 50,
      delay: "24 à 48 heures",
    },
    {
      id: "tanger",
      city: "Tanger",
      fee: 55,
      delay: "Sous 48 heures",
    },
  ],
  promos: [
    {
      code: "MELT10",
      type: "percent" as const,
      value: 10,
      minSubtotal: 60,
      active: true,
      label: "−10 % dès 60 DH",
    },
  ],
  flavorIdeas: ["Kinder", "Framboise", "Matcha", "Caramel", "Oreo"],
};

export type DeliveryZone = (typeof siteConfig.deliveryZones)[number];
export type Promo = (typeof siteConfig.promos)[number];
