export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-heritage-black py-14 text-clean-white">
      <div className="container-page">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-clean-white/85">{description}</p>}
      </div>
    </section>
  );
}
