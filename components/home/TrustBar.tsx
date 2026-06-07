const trustItems = [
  "Parturin kehittämä",
  "Suunniteltu päivittäiseen käyttöön",
  "Selkeä tuotesarja",
  "Toimitus Suomesta"
];

export function TrustBar() {
  return (
    <section aria-label="KL Texture luottamustekijät" className="border-y border-ink/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-px px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {trustItems.map((item) => (
          <div className="py-4 text-xs font-semibold uppercase tracking-nav text-ink/60" key={item}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
