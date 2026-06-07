import Image from "next/image";
import Link from "next/link";
const footerGroups = [
  {
    title: "Sivusto",
    links: [
      { href: "/", label: "Etusivu" },
      { href: "/tuotteet", label: "Tuotteet" },
      { href: "/kayttoohjeet", label: "Tutoriaalit" }
    ]
  },
  {
    title: "Asiakaspalvelu",
    links: [
      { href: "/toimitus-ja-palautukset", label: "Toimitus ja palautukset" },
      { href: "/yhteystiedot", label: "Yhteystiedot" },
      { href: "/tietosuoja", label: "Tietosuojaseloste" },
      { href: "/kayttoehdot", label: "Käyttöehdot" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_0.7fr_0.9fr_0.7fr] lg:py-20">
        <div>
          <Link aria-label="KL Texture etusivu" className="relative block h-8 w-40 overflow-visible" href="/">
            <Image
              alt="KL Texture"
              className="origin-left object-contain object-left [transform:scale(3.2)]"
              fill
              sizes="160px"
              src="/mainlogo-cropped.png"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
            Parturin kehittämä suomalainen hiustuotesarja päivittäiseen käyttöön.
          </p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-xs font-semibold uppercase tracking-nav text-white/40">{group.title}</h2>
            <ul className="mt-5 grid gap-3 text-sm text-white/70">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link className="transition hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-nav text-white/40">Sosiaalinen media</h2>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            <a
              className="inline-flex min-h-11 items-center transition hover:text-white"
              href="https://instagram.com"
              rel="noreferrer"
              target="_blank"
            >
              Instagram
            </a>
            <a
              className="inline-flex min-h-11 items-center transition hover:text-white"
              href="https://tiktok.com"
              rel="noreferrer"
              target="_blank"
            >
              TikTok
            </a>
            <a
              className="inline-flex min-h-11 items-center transition hover:text-white"
              href="https://linktr.ee/kostilehtonen"
              rel="noreferrer"
              target="_blank"
            >
              Linktree
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-center text-xs uppercase tracking-nav text-white/40">
        © KL Texture
      </div>
    </footer>
  );
}
