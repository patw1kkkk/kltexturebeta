"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    question: "Sopivatko tuotteet kaikille hiustyypeille?",
    answer:
      "Tuotteet on suunniteltu erilaisiin tarpeisiin, kuten volyymiin, tekstuuriin, pitoon ja kosteutukseen. Tuotesuosittelijamme auttaa löytämään juuri omille hiuksillesi sopivimmat vaihtoehdot."
  },
  {
    question: "Tekevätkö tuotteet hiuksista rasvaiset tai jäykät?",
    answer:
      "Oikein käytettynä tuotteet eivät jätä hiuksiin raskasta tai jäykkää tunnetta. Aloita aina pienellä määrällä ja lisää tuotetta tarvittaessa."
  },
  {
    question: "Kuinka paljon tuotetta kannattaa käyttää kerralla?",
    answer:
      "Useimmissa tuotteissa pieni määrä riittää. Esimerkiksi vahoissa aloita herneen kokoisesta määrästä ja suihkeissa muutamasta suihkauksesta. Lisää tuotetta vähitellen lopputuloksen mukaan."
  },
  {
    question: "Voiko tuotteita käyttää päivittäin?",
    answer:
      "Kyllä. Tuotteet on suunniteltu päivittäiseen käyttöön. Parhaan lopputuloksen saat, kun valitset hiustyypillesi ja tavoitteellesi sopivat tuotteet."
  },
  {
    question: "Miten tiedän, mikä tuote sopii minulle parhaiten?",
    answer:
      "Vastaa etusivun tuotesuosittelijan neljään kysymykseen. Saat henkilökohtaisen suosituksen ja perustelun siitä, miksi tuote sopii juuri sinun hiuksillesi."
  }
];

type FaqSectionProps = {
  embedded?: boolean;
};

export function FaqSection({ embedded = false }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const accordion = (
    <div className={cn("border-y border-ink/10", embedded ? "mt-5" : "mt-9")}>
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `homepage-faq-answer-${index + 1}`;
        const questionId = `homepage-faq-question-${index + 1}`;

        return (
          <div className="border-b border-ink/10 last:border-b-0" key={item.question}>
            <h3>
              <button
                aria-controls={answerId}
                aria-expanded={isOpen}
                className="group flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left text-base font-semibold leading-6 text-ink transition duration-200 ease-premium hover:text-ink/72 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:text-lg"
                id={questionId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                type="button"
              >
                <span>{item.question}</span>
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/12 text-ink/70 transition duration-200 ease-premium group-hover:border-ink/25 group-hover:text-ink motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                </span>
              </button>
            </h3>
            <div
              aria-labelledby={questionId}
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-premium motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
              id={answerId}
              role="region"
            >
              <div className="min-h-0">
                <p className="max-w-3xl pb-5 pr-12 text-sm leading-7 text-ink/64 sm:text-base">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (embedded) {
    return (
      <div aria-labelledby="homepage-faq-title">
        <div className="max-w-2xl">
          <h2 id="homepage-faq-title" className="text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            Usein kysytyt kysymykset
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink/62 sm:text-base">
            Jäikö jokin mietityttämään? Löydät yleisimmät vastaukset alta.
          </p>
        </div>
        {accordion}
      </div>
    );
  }

  return (
    <section className="bg-[#f7f3ec] px-4 py-14 sm:px-8 lg:py-20" aria-labelledby="homepage-faq-title">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="homepage-faq-title" className="text-4xl font-semibold leading-[1.02] text-ink sm:text-5xl">
            Usein kysytyt kysymykset
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink/62 sm:text-base">
            Jäikö jokin mietityttämään? Löydät yleisimmät vastaukset alta.
          </p>
        </div>

        {accordion}
      </div>
    </section>
  );
}
