"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/utils/supabase/client";
import { seedAbout, seedContact } from "@/lib/seed-data";
import type { AboutContent, ContactContent } from "@/lib/types";

const inputClass =
  "w-full rounded-xl border border-slate-light bg-white px-4 py-2.5 font-normal text-slate-ink placeholder:text-slate-light focus:border-slate-brand focus:outline-none focus:ring-2 focus:ring-slate-brand/15 transition";

const labelClass =
  "label-caps mb-1.5 block text-[0.58rem] font-semibold text-slate-mid";

export default function AdminSettingsPage() {
  const [about, setAbout] = useState<AboutContent>(seedAbout);
  const [contact, setContact] = useState<ContactContent>(seedContact);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("site_content")
        .select("key, data");
      if (error) {
        setDbError(
          "The database tables don't exist yet. Run supabase/migrations/0001_init.sql in the Supabase SQL editor first."
        );
      } else {
        const aboutRow = data?.find((r) => r.key === "about");
        const contactRow = data?.find((r) => r.key === "contact");
        if (aboutRow) setAbout({ ...seedAbout, ...aboutRow.data });
        if (contactRow) setContact({ ...seedContact, ...contactRow.data });
      }
      setLoading(false);
    })();
  }, []);

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    const supabase = createClient();
    const path = `about-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file);
    if (error) {
      alert(
        `Upload failed: ${error.message}. (Does the "portfolio" storage bucket exist?)`
      );
      setUploadingPhoto(false);
      e.target.value = "";
      return;
    }
    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    setAbout((prev) => ({ ...prev, photo_url: data.publicUrl }));
    setUploadingPhoto(false);
    e.target.value = "";
  };

  const save = async () => {
    setBusy(true);
    setSavedMsg(null);
    const supabase = createClient();
    const { error: e1 } = await supabase
      .from("site_content")
      .upsert({ key: "about", data: about });
    const { error: e2 } = await supabase
      .from("site_content")
      .upsert({ key: "contact", data: contact });
    setBusy(false);
    if (e1 || e2) {
      setSavedMsg(`Save failed: ${(e1 ?? e2)?.message}`);
    } else {
      setSavedMsg("Saved! The live site now shows your changes.");
    }
  };

  return (
    <AdminShell title="About & Contact">
      {dbError && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {dbError}
        </div>
      )}
      {loading ? (
        <p className="font-normal text-slate-mid">Loading…</p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card-soft flex flex-col gap-5 rounded-2xl p-7">
            <h2 className="font-medium text-slate-ink">About Me page</h2>
            <div>
              <label className={labelClass}>Heading</label>
              <input
                className={inputClass}
                value={about.heading}
                onChange={(e) => setAbout({ ...about, heading: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>
                Photo (replaces the Design Glyph card on About Me)
              </label>
              {about.photo_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={about.photo_url}
                  alt=""
                  className="mb-3 aspect-[4/5] w-40 rounded-xl object-cover"
                />
              )}
              <div className="flex items-center gap-3">
                <label className="flex-1 cursor-pointer rounded-xl border border-dashed border-slate-light py-2.5 text-center text-xs font-normal text-slate-mid transition hover:border-slate-brand hover:text-slate-brand">
                  {uploadingPhoto
                    ? "Uploading…"
                    : about.photo_url
                      ? "Replace photo"
                      : "Upload photo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingPhoto}
                    onChange={uploadPhoto}
                  />
                </label>
                {about.photo_url && (
                  <button
                    type="button"
                    onClick={() => setAbout({ ...about, photo_url: null })}
                    className="label-caps rounded-full border border-red-200 px-4 py-2.5 text-[0.55rem] font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className={labelClass}>Intro paragraph</label>
              <textarea
                rows={3}
                className={`${inputClass} resize-y`}
                value={about.intro}
                onChange={(e) => setAbout({ ...about, intro: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>
                Body (blank line = new paragraph)
              </label>
              <textarea
                rows={8}
                className={`${inputClass} resize-y`}
                value={about.body}
                onChange={(e) => setAbout({ ...about, body: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Skills (comma separated)</label>
              <textarea
                rows={2}
                className={`${inputClass} resize-y`}
                value={about.skills.join(", ")}
                onChange={(e) =>
                  setAbout({
                    ...about,
                    skills: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Education</label>
              <input
                className={inputClass}
                value={about.education}
                onChange={(e) =>
                  setAbout({ ...about, education: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="card-soft flex flex-col gap-5 rounded-2xl p-7">
              <h2 className="font-medium text-slate-ink">Contact details</h2>
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  className={inputClass}
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  className={inputClass}
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  className={inputClass}
                  value={contact.location}
                  onChange={(e) =>
                    setContact({ ...contact, location: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Contact page blurb</label>
                <textarea
                  rows={3}
                  className={`${inputClass} resize-y`}
                  value={contact.blurb}
                  onChange={(e) =>
                    setContact({ ...contact, blurb: e.target.value })
                  }
                />
              </div>
            </div>

            {savedMsg && (
              <p
                className={`rounded-xl px-5 py-3.5 text-sm ${
                  savedMsg.startsWith("Saved")
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {savedMsg}
              </p>
            )}
            <button
              onClick={save}
              disabled={busy || !!dbError}
              className="label-caps rounded-full bg-slate-brand py-4 text-[0.65rem] font-semibold text-white transition hover:bg-slate-ink disabled:opacity-60"
            >
              {busy ? "Saving…" : "Save all changes"}
            </button>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
