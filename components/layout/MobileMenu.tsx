"use client";

import Link from "next/link";
import { useEffect } from "react";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
};

const mobileLabels: Record<string, string> = {
  "/": "Etusivu",
  "/tuotteet": "Tuotteet",
  "/kayttoohjeet": "Tutoriaalit"
};

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Sulje valikko"
        className="fixed inset-0 z-[60] cursor-default bg-transparent lg:hidden"
        onClick={onClose}
        type="button"
      />
      <nav
        aria-label="Mobiilivalikko"
        className="mobile-menu-panel fixed inset-x-4 top-[4.75rem] z-[80] overflow-hidden rounded-[22px] border border-ink/10 bg-white text-ink shadow-[0_18px_50px_rgb(11_11_11_/_0.14)] lg:hidden"
        id="mobile-navigation"
      >
        <div className="grid p-2">
          {links.map((link) => (
            <Link
              className="flex min-h-12 items-center rounded-[16px] px-4 text-sm font-semibold uppercase tracking-nav text-ink transition duration-200 ease-premium hover:bg-[#f7f4ef] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink"
              href={link.href}
              key={link.href}
              onClick={onClose}
            >
              {mobileLabels[link.href] ?? link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
