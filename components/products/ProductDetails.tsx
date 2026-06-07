import type { Product } from "@/data/products";

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const sections = [
    { title: "Mitä tuote tekee?", content: product.longDescription },
    { title: "Kenelle tuote sopii?", list: product.bestFor },
    { title: "Kenelle tuote ei välttämättä sovi?", list: product.notIdealFor },
    { title: "Näin käytät tuotetta", list: product.howToUse },
    { title: "Kuinka paljon tuotetta kannattaa käyttää?", content: product.amountToUse },
    { title: "Ainesosat", content: product.ingredients }
  ];

  return (
    <div className="grid gap-4">
      {sections.map((section) => (
        <section className="border-t border-ink/10 py-7" key={section.title}>
          <h2 className="text-lg font-semibold text-ink">{section.title}</h2>
          {section.content ? <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/65">{section.content}</p> : null}
          {section.list ? (
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink/65">
              {section.list.map((item) => (
                <li className="flex gap-3" key={item}>
                  <span className="mt-2 size-1.5 shrink-0 bg-ink" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
