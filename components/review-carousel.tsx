import { reviews } from "@/data/reviews";

export function ReviewCarousel() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="max-w-xl font-serif text-4xl sm:text-5xl">Vous en parlez mieux que nous 🤎</h2>
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="min-w-[84%] snap-center rounded-[1.6rem] bg-white p-6 shadow-[0_16px_40px_rgba(58,33,24,0.05)] md:min-w-0"
            >
              <p className="tracking-[0.2em] text-caramel" aria-label={`${review.rating} sur 5`}>
                {"★".repeat(review.rating)}
                <span className="sr-only"> étoiles</span>
              </p>
              <p className="mt-4 font-serif text-2xl leading-snug">{review.text}</p>
              <p className="mt-6 text-sm text-milk">
                {review.name} · {review.city}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
