export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <header className="px-5 pb-8 pt-32 sm:px-8">
      <div className="mx-auto max-w-[1100px]">
        {eyebrow ? <p className="text-[0.72rem] uppercase tracking-[0.32em] text-caramel">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.95] sm:text-6xl">{title}</h1>
        {text ? <p className="mt-4 max-w-xl text-lg leading-relaxed text-milk">{text}</p> : null}
      </div>
    </header>
  );
}
