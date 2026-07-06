"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/utils/supabase/client";
import { importStarterContent } from "@/lib/admin-seed";
import type { Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [dbError, setDbError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      setDbError(
        "The database tables don't exist yet. Run supabase/migrations/0001_init.sql in the Supabase SQL editor first."
      );
      setProjects([]);
      return;
    }
    setDbError(null);
    setProjects(data as Project[]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const importStarter = async () => {
    if (!confirm("Import the 10 portfolio brands from the booklet?")) return;
    setBusy(true);
    try {
      await importStarterContent(createClient());
      await load();
    } catch (e) {
      alert(`Import failed: ${e instanceof Error ? e.message : e}`);
    }
    setBusy(false);
  };

  const toggleFeatured = async (p: Project) => {
    const supabase = createClient();
    await supabase
      .from("projects")
      .update({ featured: !p.featured })
      .eq("id", p.id);
    load();
  };

  const remove = async (p: Project) => {
    if (!confirm(`Delete "${p.title}" and all of its images? This cannot be undone.`))
      return;
    const supabase = createClient();
    await supabase.from("projects").delete().eq("id", p.id);
    load();
  };

  return (
    <AdminShell title="Projects">
      {dbError && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {dbError}
        </div>
      )}

      <div className="mb-8 flex items-center gap-3">
        <Link
          href="/admin/projects/new"
          className="label-caps rounded-full bg-slate-brand px-6 py-3 text-[0.6rem] font-semibold text-white transition hover:bg-slate-ink"
        >
          + New project
        </Link>
        {!dbError && projects !== null && projects.length === 0 && (
          <button
            onClick={importStarter}
            disabled={busy}
            className="label-caps rounded-full border border-slate-brand px-6 py-3 text-[0.6rem] font-semibold text-slate-brand transition hover:bg-slate-brand hover:text-white disabled:opacity-50"
          >
            {busy ? "Importing…" : "Import the booklet's 10 brands"}
          </button>
        )}
      </div>

      {projects === null ? (
        <p className="font-light text-slate-mid">Loading…</p>
      ) : projects.length === 0 ? (
        !dbError && (
          <p className="font-light text-slate-mid">
            No projects yet — create one or import the starter set.
          </p>
        )
      ) : (
        <ul className="grid gap-4">
          {projects.map((p) => (
            <li
              key={p.id}
              className="card-soft flex items-center gap-5 rounded-2xl p-4"
            >
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-ice">
                {p.cover_url && (
                  <Image
                    src={p.cover_url}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-ink">
                  {p.title}
                  <span className="ml-3 text-xs font-light text-slate-mid">
                    /{p.slug}
                  </span>
                </p>
                <p className="truncate text-sm font-light text-slate-mid">
                  {p.tagline}
                </p>
              </div>
              <button
                onClick={() => toggleFeatured(p)}
                title="Show in the homepage row"
                className={`label-caps rounded-full px-4 py-2 text-[0.55rem] font-semibold transition ${
                  p.featured
                    ? "bg-slate-brand text-white"
                    : "border border-slate-light text-slate-mid hover:border-slate-brand"
                }`}
              >
                {p.featured ? "Featured" : "Feature"}
              </button>
              <Link
                href={`/admin/projects/${p.id}`}
                className="label-caps rounded-full border border-slate-light px-4 py-2 text-[0.55rem] font-semibold text-slate-brand transition hover:border-slate-brand"
              >
                Edit
              </Link>
              <button
                onClick={() => remove(p)}
                className="label-caps rounded-full border border-red-200 px-4 py-2 text-[0.55rem] font-semibold text-red-500 transition hover:bg-red-50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
