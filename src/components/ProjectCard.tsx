"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="card-soft group block overflow-hidden rounded-2xl transition-shadow duration-500"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-ice">
          {project.cover_url && (
            <Image
              src={project.cover_url}
              alt={`${project.title} — brand design by Rachel Panigel`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="label-caps absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[0.55rem] font-semibold text-slate-brand backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h3 className="text-lg font-medium tracking-wide text-slate-ink">
              {project.title}
            </h3>
            {project.tagline && (
              <p className="mt-0.5 text-sm font-normal text-slate-mid">
                {project.tagline}
              </p>
            )}
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-light text-slate-mid transition-all duration-400 group-hover:border-slate-brand group-hover:bg-slate-brand group-hover:text-white">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
