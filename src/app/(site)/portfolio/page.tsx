import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Brand identities, packaging, editorial design and typography by Rachel Panigel.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="relative">
      <section className="relative overflow-hidden pb-10 pt-36">
        <div className="glyph-pattern pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="label-caps text-[0.65rem] font-semibold text-slate-mid">
              Portfolio
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-wide text-slate-ink sm:text-5xl">
              Every brand tells a story.
            </h1>
            <p className="mt-5 max-w-xl text-lg font-normal leading-relaxed text-slate-mid">
              Complete identities designed from the ground up — logos,
              packaging, editorial, patterns, type and more. Click into any
              brand to see the full story.
            </p>
            <div className="rule mt-12" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 pt-6 sm:px-8">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} showIndex={false} />
          ))}
        </div>
      </section>
    </div>
  );
}
