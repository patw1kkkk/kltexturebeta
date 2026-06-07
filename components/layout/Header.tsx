"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SHOPIFY_CART_ID } from "@/components/shopify/constants";

const navLinks = [
  { href: "/", label: "ETUSIVU" },
  { href: "/tuotteet", label: "TUOTTEET" },
  { href: "/kayttoohjeet", label: "TUTORIAALIT" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const transparentHomeHeader = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const openCart = () => {
    const cart = document.getElementById(SHOPIFY_CART_ID) as (HTMLElement & { showModal?: () => void }) | null;
    cart?.showModal?.();
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition duration-300 ease-premium",
          transparentHomeHeader ? "bg-white/0 text-white" : "border-b border-ink/10 bg-white/90 text-ink backdrop-blur-xl"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
          <Link aria-label="KL Texture etusivu" className="group leading-none" href="/">
            <span className="relative block h-6 w-32 overflow-visible sm:h-8 sm:w-40">
              <Image
                alt="KL Texture"
                className={cn(
                  "pointer-events-none origin-left object-contain object-left transition-opacity duration-300 ease-premium [transform:translateX(-0.25rem)_scale(4)] sm:[transform:scale(4)]",
                  transparentHomeHeader ? "opacity-100" : "opacity-0"
                )}
                fill
                priority
                sizes="(min-width: 640px) 160px, 128px"
                src="/mainlogo-cropped.png"
              />
              <Image
                alt=""
                aria-hidden="true"
                className={cn(
                  "pointer-events-none origin-left object-contain object-left transition-opacity duration-300 ease-premium [transform:translateX(-0.25rem)_scale(4)] sm:[transform:scale(4)]",
                  transparentHomeHeader ? "opacity-0" : "opacity-100"
                )}
                fill
                priority
                sizes="(min-width: 640px) 160px, 128px"
                src="/mainlogo-black-cropped.png"
              />
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <nav aria-label="Päänavigaatio" className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  className={cn(
                    "border-l px-5 text-xs font-semibold uppercase tracking-nav transition",
                    transparentHomeHeader
                      ? "border-white/15 text-white/70 hover:text-white"
                      : "border-ink/10 text-ink/65 hover:text-ink"
                  )}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <button
              aria-label="Avaa ostoskori"
              className={cn(
                "flex size-11 items-center justify-center border transition focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                transparentHomeHeader
                  ? "border-white/20 text-white hover:border-white focus-visible:outline-white"
                  : "border-ink/15 text-ink hover:border-ink focus-visible:outline-ink"
              )}
              onClick={openCart}
              type="button"
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
            </button>
            <button
              aria-controls="mobile-navigation"
              aria-expanded={open}
              aria-label={open ? "Sulje valikko" : "Avaa valikko"}
              className={cn(
                "flex size-11 items-center justify-center border focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden",
                transparentHomeHeader
                  ? "border-white/20 text-white focus-visible:outline-white"
                  : "border-ink/15 text-ink focus-visible:outline-ink"
              )}
              onClick={() => setOpen((isOpen) => !isOpen)}
              type="button"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu links={navLinks} onClose={() => setOpen(false)} open={open} />
    </>
  );
}
