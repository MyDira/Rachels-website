import Image from "next/image";
import Link from "next/link";
import HeroQuote from "@/components/HeroQuote";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { getAbout, getFeaturedProjects } from "@/lib/data";

export default async function HomePage() {
  const [featured, about] = await Promise.all([
    getFeaturedProjects(),
    getAbout(),
  ]);

  return (
    <>
      <HeroQuote />

      {/* Selected work */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="label-caps text-[0.65rem] font-semibold text-slate-mid">
                Selected Work
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-wide text-slate-ink sm:text-4xl">
                Brands, built from scratch
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="label-caps group hidden shrink-0 items-center gap-3 pb-1 text-[0.65rem] font-semibold text-slate-brand sm:flex"
            >
              View all projects
              <span className="grid h-8 w-8 place-items-center rounded-full border border-slate-light transition-all group-hover:bg-slate-brand group-hover:text-white">
                →
              </span>
            </Link>
          </div>
          <div className="rule mt-8" />
        </Reveal>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-12 text-center sm:hidden">
          <Link
            href="/portfolio"
            className="label-caps inline-flex items-center gap-2 rounded-full border border-slate-light px-6 py-3 text-[0.65rem] font-semibold text-slate-brand"
          >
            View all projects →
          </Link>
        </Reveal>
      </section>

      {/* About teaser */}
      <section className="relative overflow-hidden bg-white">
        <div className="glyph-pattern pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 md:grid-cols-[auto_1fr]">
          <Reveal className="mx-auto md:mx-0">
            <Image
              src="/brand/dg-mark.png"
              alt="Design Glyph monogram"
              width={190}
              height={236}
              className="h-44 w-auto md:h-56"
            />
          </Reveal>
          <div>
            <Reveal delay={0.1}>
              <p className="label-caps text-[0.65rem] font-semibold text-slate-mid">
                The designer
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-wide text-slate-ink sm:text-4xl">
                Every project deserves a special something.
              </h2>
              <p className="mt-5 max-w-xl text-lg font-normal leading-relaxed text-slate-mid">
                {about.intro}
              </p>
              <Link
                href="/about"
                className="label-caps mt-8 inline-flex items-center gap-3 rounded-full bg-slate-brand px-7 py-3.5 text-[0.65rem] font-semibold text-white transition-all hover:bg-slate-ink hover:shadow-lg"
              >
                About me →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact CTA — blends into the page background */}
      <section className="relative overflow-hidden">
        <div className="glyph-pattern pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_center,rgba(255,255,255,0.6),transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl px-5 py-28 text-center sm:px-8">
          <Reveal>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-slate-light" />
              <span className="label-caps text-[0.6rem] font-semibold text-slate-mid">
                Let&apos;s work together
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-slate-light" />
            </div>
            <h2 className="mx-auto mt-7 max-w-2xl text-2xl font-medium tracking-tight text-slate-brand sm:text-3xl">
              Have a problem worth solving?
            </h2>
            <Link
              href="/contact"
              className="group label-caps mt-10 inline-flex items-center gap-3 rounded-full bg-slate-brand px-8 py-4 text-[0.65rem] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(61,79,90,0.5)] transition-all hover:bg-slate-ink hover:shadow-[0_14px_36px_-10px_rgba(61,79,90,0.6)]"
            >
              Get in touch
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
