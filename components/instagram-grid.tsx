import Image from "next/image";
import { instagramPosts } from "@/data/instagram";
import { siteConfig } from "@/lib/config";

export function InstagramGrid() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl">Suivez nos envies 🤎</h2>
            <p className="mt-3 text-milk">Retrouvez Melt & Co. sur Instagram</p>
          </div>
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center rounded-full bg-cocoa px-6 text-[0.72rem] uppercase tracking-[0.16em] text-cream"
          >
            {siteConfig.instagram.handle}
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-[1.2rem] bg-beige"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover transition duration-700 hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, 320px"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
