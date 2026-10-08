import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6 pt-24 text-center">
      <div>
        <p className="text-[0.72rem] uppercase tracking-[0.32em] text-caramel">404</p>
        <h1 className="mt-3 font-serif text-5xl">Cette page a fondu.</h1>
        <p className="mt-3 text-milk">Le cookie, lui, est toujours là.</p>
        <Link href="/" className="mt-8 inline-flex h-12 items-center rounded-full bg-cocoa px-6 text-[0.72rem] uppercase tracking-[0.16em] text-cream">
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
