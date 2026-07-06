import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getAbout, getContact } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Rachel Panigel — graphic designer behind Design Glyph. BA in Digital Multimedia Design, Touro University.",
};

export default async function AboutPage() {
  const [about, contact] = await Promise.all([getAbout(), getContact()]);

  return (
    <div>
      <section className="relative overflow-hidden pb-16 pt-36">
        <div className="glyph-pattern pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="label-caps text-[0.65rem] font-semibold text-slate-mid">
              About Me
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-wide text-slate-ink sm:text-5xl">
              {about.heading}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_360px]">
          <div>
            <Reveal>
              <p className="text-xl font-light leading-relaxed text-slate-ink">
                {about.intro}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-6 text-lg font-light leading-relaxed text-slate-mid">
                {about.body.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rule my-12" />
              <p className="label-caps text-[0.65rem] font-semibold text-slate-mid">
                Education
              </p>
              <p className="mt-3 text-lg font-light text-slate-ink">
                {about.education}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <Link
                href="/contact"
                className="label-caps mt-12 inline-flex items-center gap-3 rounded-full bg-slate-brand px-7 py-3.5 text-[0.65rem] font-semibold text-white transition-all hover:bg-slate-ink hover:shadow-lg"
              >
                Work with me →
              </Link>
            </Reveal>
          </div>

          <div className="flex flex-col gap-8">
            <Reveal delay={0.1}>
              <div className="card-soft relative overflow-hidden rounded-2xl p-8">
                <div className="glyph-pattern pointer-events-none absolute inset-0 opacity-50" />
                <Image
                  src="/brand/dg-mark.png"
                  alt="Design Glyph monogram"
                  width={120}
                  height={150}
                  className="relative mx-auto h-32 w-auto"
                />
                <p className="label-caps relative mt-6 text-center text-[0.6rem] font-semibold text-slate-brand">
                  Design Glyph
                </p>
                <p className="relative mt-2 text-center text-sm font-light text-slate-mid">
                  Simplistic / Innovative / Expansive
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card-soft rounded-2xl p-8">
                <p className="label-caps text-[0.65rem] font-semibold text-slate-mid">
                  Skills
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {about.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-slate-light px-3.5 py-1.5 text-xs font-light text-slate-brand"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="card-soft rounded-2xl p-8">
                <p className="label-caps text-[0.65rem] font-semibold text-slate-mid">
                  Contact
                </p>
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                  className="mt-4 block font-light text-slate-ink transition hover:text-slate-brand"
                >
                  {contact.phone}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 block break-all font-light text-slate-ink transition hover:text-slate-brand"
                >
                  {contact.email}
                </a>
                <p className="mt-1 font-light text-slate-mid">
                  {contact.location}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
