import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getProject, getProjects } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  return {
    title: project ? project.title : "Project",
    description: project?.description ?? undefined,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, all] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const idx = all.findIndex((p) => p.slug === project.slug);
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];

  return (
    <article>
      {/* Brand hero */}
      <section className="relative overflow-hidden pb-14 pt-36">
        <div className="glyph-pattern pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Link
              href="/portfolio"
              className="label-caps inline-flex items-center gap-2 text-[0.6rem] font-semibold text-slate-mid transition hover:text-slate-ink"
            >
              ← All projects
            </Link>
          </Reveal>

          <div className="mt-8 grid items-end gap-10 md:grid-cols-[1fr_auto]">
            <Reveal delay={0.05}>
              {project.logo_url && (
                <Image
                  src={project.logo_url}
                  alt={`${project.title} logo`}
                  width={220}
                  height={120}
                  className="mb-7 h-16 w-auto object-contain sm:h-20"
                />
              )}
              <h1 className="text-4xl font-medium tracking-wide text-slate-ink sm:text-6xl">
                {project.title}
              </h1>
              {project.tagline && (
                <p className="mt-3 text-xl font-light text-slate-mid">
                  {project.tagline}
                </p>
              )}
            </Reveal>

            <Reveal delay={0.15} className="flex flex-col gap-5 md:items-end">
              {project.attributes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.attributes.map((a) => (
                    <span
                      key={a}
                      className="label-caps rounded-full border border-slate-light bg-white/70 px-4 py-1.5 text-[0.55rem] font-semibold text-slate-brand"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-4">
                {project.brand_font && (
                  <span className="text-sm font-light text-slate-mid">
                    Typeface — {project.brand_font}
                  </span>
                )}
                {project.palette.length > 0 && (
                  <span className="flex gap-1.5">
                    {project.palette.map((c) => (
                      <span
                        key={c}
                        title={c}
                        className="h-5 w-5 rounded-md border border-black/10"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </span>
                )}
              </div>
            </Reveal>
          </div>

          {project.description && (
            <Reveal delay={0.2}>
              <p className="mt-9 max-w-3xl text-lg font-light leading-relaxed text-slate-mid">
                {project.description}
              </p>
            </Reveal>
          )}
          <div className="rule mt-12" />
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="flex flex-col gap-10">
          {(project.images ?? []).map((im, i) => (
            <Reveal key={im.id} delay={0.05}>
              <figure className="card-soft overflow-hidden rounded-2xl">
                <Image
                  src={im.url}
                  alt={im.caption ?? `${project.title} — image ${i + 1}`}
                  width={2000}
                  height={800}
                  sizes="(max-width: 1280px) 100vw, 1216px"
                  className="w-full"
                  priority={i === 0}
                />
                {im.caption && (
                  <figcaption className="flex items-center justify-between px-6 py-4">
                    <span className="text-sm font-light text-slate-mid">
                      {im.caption}
                    </span>
                    <span className="label-caps text-[0.55rem] font-semibold text-slate-light">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(project.images?.length ?? 0).padStart(2, "0")}
                    </span>
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Prev / next */}
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <div className="rule mb-10" />
        <div className="flex items-center justify-between gap-6">
          <Link
            href={`/portfolio/${prev.slug}`}
            className="group flex items-center gap-4"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-slate-light text-slate-mid transition-all group-hover:border-slate-brand group-hover:bg-slate-brand group-hover:text-white">
              ←
            </span>
            <span className="hidden sm:block">
              <span className="label-caps block text-[0.55rem] font-semibold text-slate-mid">
                Previous
              </span>
              <span className="text-slate-ink">{prev.title}</span>
            </span>
          </Link>
          <Link
            href="/portfolio"
            className="label-caps text-[0.6rem] font-semibold text-slate-mid transition hover:text-slate-ink"
          >
            All projects
          </Link>
          <Link
            href={`/portfolio/${next.slug}`}
            className="group flex items-center gap-4"
          >
            <span className="hidden text-right sm:block">
              <span className="label-caps block text-[0.55rem] font-semibold text-slate-mid">
                Next
              </span>
              <span className="text-slate-ink">{next.title}</span>
            </span>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-slate-light text-slate-mid transition-all group-hover:border-slate-brand group-hover:bg-slate-brand group-hover:text-white">
              →
            </span>
          </Link>
        </div>
      </section>
    </article>
  );
}
