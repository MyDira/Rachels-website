import Image from "next/image";
import { getContact } from "@/lib/data";

export default async function Footer() {
  const contact = await getContact();

  return (
    <footer className="relative mt-auto overflow-hidden bg-slate-brand text-ice">
      <div className="glyph-pattern pointer-events-none absolute inset-0 opacity-[0.35] invert" />
      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/brand/dg-mark-white.png"
              alt="Design Glyph"
              width={44}
              height={55}
              className="h-12 w-auto opacity-90"
            />
            <div>
              <p className="label-caps text-sm font-semibold">Design Glyph</p>
              <p className="mt-1 text-sm font-normal text-slate-light">
                Design is a solution to a problem.
              </p>
            </div>
          </div>

          <div className="text-center text-sm font-normal text-slate-light md:text-right">
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

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs font-normal text-slate-light">
          <p>© 2023 Design Glyph</p>
        </div>
      </div>
    </footer>
  );
}
