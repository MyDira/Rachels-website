import Image from "next/image";
import Link from "next/link";
import { getContact } from "@/lib/data";

export default async function Footer() {
  const contact = await getContact();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-slate-brand text-ice">
      <div className="glyph-pattern pointer-events-none absolute inset-0 opacity-[0.35] invert" />
      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/brand/dg-mark-white.png"
              alt="Design Glyph"
              width={44}
              height={55}
              className="h-12 w-auto opacity-90"
            />
            <div>
              <p className="label-caps text-xs font-medium">Design Glyph</p>
              <p className="mt-1 text-sm font-light text-slate-light">
                Design is a solution to a problem.
              </p>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm font-light">
            <Link href="/" className="text-slate-light transition hover:text-white">
              Home
            </Link>
            <Link
              href="/portfolio"
              className="text-slate-light transition hover:text-white"
            >
              Portfolio
            </Link>
            <Link
              href="/contact"
              className="text-slate-light transition hover:text-white"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="text-slate-light transition hover:text-white"
            >
              About Me
            </Link>
          </nav>

          <div className="text-sm font-light text-slate-light">
            <p className="label-caps mb-3 text-[0.65rem] text-white/70">
              Get in touch
            </p>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="block transition hover:text-white"
            >
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1 block transition hover:text-white"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6 text-xs font-light text-slate-light">
          <p>© {year} Rachel Panigel · Design Glyph</p>
          <p className="label-caps text-[0.6rem]">Brooklyn, NY</p>
        </div>
      </div>
    </footer>
  );
}
