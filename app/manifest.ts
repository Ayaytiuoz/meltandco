import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Melt & Co.",
    short_name: "Melt & Co.",
    description: "NYC Cookies, brownies et tiramisu. Made to melt.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F0E8",
    theme_color: "#3A2118",
    lang: "fr",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
