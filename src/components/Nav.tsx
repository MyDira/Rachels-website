"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About Me" },
  { href: "/contact", label: "Let's Connect" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(76,94,104,0.08),0_8px_32px_-16px_rgba(61,79,90,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-3.5">
          <Image
            src="/brand/dg-mark.png"
            alt="Design Glyph logo"
            width={52}
            height={65}
            priority
            className="h-14 w-auto transition-transform duration-500 group-hover:rotate-[8deg]"
          />
          <span className="label-caps hidden text-[0.82rem] font-semibold text-slate-brand sm:block">
            Design
            <span className="ml-2 font-medium text-slate-mid">Glyph</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`label-caps relative pb-1 text-[0.82rem] font-semibold transition-colors ${
                isActive(l.href)
                  ? "text-slate-ink"
                  : "text-slate-mid hover:text-slate-ink"
              }`}
            >
              {l.label}
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-slate-brand transition-transform duration-300 ${
                  isActive(l.href) ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-slate-ink transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-slate-ink transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`label-caps py-3 text-sm font-semibold ${
                    isActive(l.href) ? "text-slate-ink" : "text-slate-mid"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
