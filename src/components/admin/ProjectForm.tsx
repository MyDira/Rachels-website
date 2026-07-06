"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/utils/supabase/client";
import type { Project, ProjectImage } from "@/lib/types";

type EditableImage = Pick<ProjectImage, "url" | "caption"> & { id?: string };

const inputClass =
  "w-full rounded-xl border border-slate-light bg-white px-4 py-2.5 font-light text-slate-ink placeholder:text-slate-light focus:border-slate-brand focus:outline-none focus:ring-2 focus:ring-slate-brand/15 transition";

const labelClass =
  "label-caps mb-1.5 block text-[0.58rem] font-semibold text-slate-mid";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProjectForm({ projectId }: { projectId?: string }) {
  const router = useRouter();
  const isNew = !projectId;

  const [loading, setLoading] = useState(!isNew);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [brandFont, setBrandFont] = useState("");
  const [attributes, setAttributes] = useState("");
  const [palette, setPalette] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);
  const [images, setImages] = useState<EditableImage[]>([]);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*, images:project_images(*)")
        .eq("id", projectId)
        .single();
      if (error || !data) {
        setError("Could not load this project.");
        setLoading(false);
        return;
      }
      const p = data as Project;
      setTitle(p.title);
      setSlug(p.slug);
      setSlugTouched(true);
      setTagline(p.tagline ?? "");
      setDescription(p.description ?? "");
      setBrandFont(p.brand_font ?? "");
      setAttributes(p.attributes.join(", "));
      setPalette(p.palette.join(", "));
      setLogoUrl(p.logo_url ?? "");
      setCoverUrl(p.cover_url ?? "");
      setFeatured(p.featured);
      setSortOrder(p.sort_order);
      setImages(
        (p.images ?? [])
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((im) => ({ id: im.id, url: im.url, caption: im.caption }))
      );
      setLoading(false);
    })();
  }, [isNew, projectId]);

  const upload = async (file: File): Promise<string | null> => {
    const supabase = createClient();
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage
      .from("portfolio")
      .upload(path, file);
    if (error) {
      alert(
        `Upload failed: ${error.message}. (Does the "portfolio" storage bucket exist?)`
      );
      return null;
    }
    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    return data.publicUrl;
  };

  const uploadTo = async (
    e: React.ChangeEvent<HTMLInputElement>,
    set: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await upload(file);
    if (url) set(url);
    e.target.value = "";
  };

  const addGalleryFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    for (const f of files) {
      const url = await upload(f);
      if (url) setImages((prev) => [...prev, { url, caption: "" }]);
    }
    e.target.value = "";
  };

  const moveImage = (i: number, dir: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const save = async () => {
    if (!title.trim() || !slug.trim()) {
      setError("A title and slug are required.");
      return;
    }
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const payload = {
      title: title.trim(),
      slug: slugify(slug),
      tagline: tagline.trim() || null,
      description: description.trim() || null,
      brand_font: brandFont.trim() || null,
      attributes: attributes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      palette: palette
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      logo_url: logoUrl.trim() || null,
      cover_url: coverUrl.trim() || null,
      featured,
      sort_order: sortOrder,
    };

    let id = projectId;
    if (isNew) {
      const { data, error } = await supabase
        .from("projects")
        .insert(payload)
        .select("id")
        .single();
      if (error) {
        setError(error.message);
        setBusy(false);
        return;
      }
      id = data.id;
    } else {
      const { error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", id);
      if (error) {
        setError(error.message);
        setBusy(false);
        return;
      }
      await supabase.from("project_images").delete().eq("project_id", id);
    }

    if (images.length > 0) {
      const { error } = await supabase.from("project_images").insert(
        images.map((im, i) => ({
          project_id: id,
          url: im.url,
          caption: im.caption?.trim() || null,
          sort_order: i,
        }))
      );
      if (error) {
        setError(`Project saved, but images failed: ${error.message}`);
        setBusy(false);
        return;
      }
    }

    router.push("/admin");
    router.refresh();
  };

  if (loading) {
    return (
      <AdminShell title={isNew ? "New project" : "Edit project"}>
        <p className="font-light text-slate-mid">Loading…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title={isNew ? "New project" : `Edit — ${title}`}>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="card-soft flex flex-col gap-5 rounded-2xl p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Title *</label>
              <input
                className={inputClass}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slugTouched) setSlug(slugify(e.target.value));
                }}
                placeholder="Brand name"
              />
            </div>
            <div>
              <label className={labelClass}>Slug * (URL)</label>
              <input
                className={inputClass}
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugTouched(true);
                }}
                placeholder="brand-name"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Tagline</label>
            <input
              className={inputClass}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="A short line under the title"
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              rows={5}
              className={`${inputClass} resize-y`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="The story of this brand…"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Typeface</label>
              <input
                className={inputClass}
                value={brandFont}
                onChange={(e) => setBrandFont(e.target.value)}
                placeholder="e.g. Futura"
              />
            </div>
            <div>
              <label className={labelClass}>Attributes (comma separated)</label>
              <input
                className={inputClass}
                value={attributes}
                onChange={(e) => setAttributes(e.target.value)}
                placeholder="Happy, Healthy, Creative"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>
              Palette (comma separated hex colors)
            </label>
            <input
              className={inputClass}
              value={palette}
              onChange={(e) => setPalette(e.target.value)}
              placeholder="#4C5E68, #EAF5F9"
            />
            <div className="mt-2 flex gap-1.5">
              {palette
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
                .map((c, i) => (
                  <span
                    key={i}
                    className="h-5 w-5 rounded-md border border-black/10"
                    style={{ backgroundColor: c }}
                  />
                ))}
            </div>
          </div>

          {/* Gallery */}
          <div>
            <label className={labelClass}>Gallery images</label>
            <div className="flex flex-col gap-3">
              {images.map((im, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-slate-light/60 bg-ice-soft p-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={im.url}
                    alt=""
                    className="h-14 w-20 rounded-lg object-cover"
                  />
                  <input
                    className={`${inputClass} flex-1`}
                    value={im.caption ?? ""}
                    onChange={(e) =>
                      setImages((prev) =>
                        prev.map((x, j) =>
                          j === i ? { ...x, caption: e.target.value } : x
                        )
                      )
                    }
                    placeholder="Caption (optional)"
                  />
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveImage(i, -1)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-slate-light text-slate-mid hover:border-slate-brand"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(i, 1)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-slate-light text-slate-mid hover:border-slate-brand"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, j) => j !== i))
                      }
                      className="grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-light py-4 text-sm font-light text-slate-mid transition hover:border-slate-brand hover:text-slate-brand">
                + Upload images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={addGalleryFiles}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="card-soft flex flex-col gap-5 rounded-2xl p-7">
            <div>
              <label className={labelClass}>Cover image (card)</label>
              {coverUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverUrl}
                  alt=""
                  className="mb-2 h-32 w-full rounded-xl object-cover"
                />
              )}
              <input
                className={inputClass}
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="/portfolio/covers/…  or upload ↓"
              />
              <label className="mt-2 block cursor-pointer rounded-xl border border-dashed border-slate-light py-2.5 text-center text-xs font-light text-slate-mid transition hover:border-slate-brand hover:text-slate-brand">
                Upload cover
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => uploadTo(e, setCoverUrl)}
                />
              </label>
            </div>
            <div>
              <label className={labelClass}>Logo (optional)</label>
              {logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt=""
                  className="mb-2 h-14 w-auto rounded-lg bg-white object-contain p-1"
                />
              )}
              <input
                className={inputClass}
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="/portfolio/logos/…  or upload ↓"
              />
              <label className="mt-2 block cursor-pointer rounded-xl border border-dashed border-slate-light py-2.5 text-center text-xs font-light text-slate-mid transition hover:border-slate-brand hover:text-slate-brand">
                Upload logo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => uploadTo(e, setLogoUrl)}
                />
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-3 text-sm font-light text-slate-ink">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 accent-[#4c5e68]"
                />
                Featured on homepage
              </label>
              <div className="flex items-center gap-2">
                <span className={labelClass + " !mb-0"}>Order</span>
                <input
                  type="number"
                  className={`${inputClass} w-20`}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-5 py-3.5 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={busy}
              className="label-caps flex-1 rounded-full bg-slate-brand py-4 text-[0.65rem] font-semibold text-white transition hover:bg-slate-ink disabled:opacity-60"
            >
              {busy ? "Saving…" : isNew ? "Create project" : "Save changes"}
            </button>
            <button
              onClick={() => router.push("/admin")}
              className="label-caps rounded-full border border-slate-light px-6 py-4 text-[0.65rem] font-semibold text-slate-mid transition hover:border-slate-brand"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
