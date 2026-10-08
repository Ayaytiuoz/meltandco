import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s · Melt & Co.",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["NYC cookies", "cookies Maroc", "brownies", "tiramisu", "Melt & Co", "pâtisserie", "Casablanca"],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/images/products/classic.jpg",
        width: 1400,
        height: 1400,
        alt: "Cookie NYC Melt & Co., épais et chargé de chocolat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/products/classic.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#3A2118",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dm.variable} h-full`}>
      <body suppressHydrationWarning className="min-h-full bg-cream font-sans text-chocolate antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Bakery",
            name: siteConfig.name,
            slogan: "MADE TO MELT.",
            url: siteConfig.siteUrl,
            image: `${siteConfig.siteUrl}/images/products/classic.jpg`,
            servesCuisine: "Desserts",
            address: {
              "@type": "PostalAddress",
              addressLocality: siteConfig.studio.city,
              addressCountry: "MA",
            },
            areaServed: siteConfig.deliveryZones.map((zone) => zone.city),
          }}
        />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cocoa focus:px-4 focus:py-2 focus:text-cream"
        >
          Aller au contenu
        </a>
        <Providers>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
