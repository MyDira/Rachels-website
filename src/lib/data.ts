import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { seedAbout, seedContact, seedProjects } from "./seed-data";
import type { AboutContent, ContactContent, Project } from "./types";

/**
 * Data access with graceful fallback: if the Supabase tables are missing or
 * empty (e.g. the migration hasn't been run yet), the site falls back to the
 * built-in seed content so it always renders.
 */

async function supabase() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getProjects(): Promise<Project[]> {
  try {
    const sb = await supabase();
    const { data, error } = await sb
      .from("projects")
      .select("*, images:project_images(*)")
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return seedProjects;
    return data.map((p) => ({
      ...p,
      images: (p.images ?? []).sort(
        (a: { sort_order: number }, b: { sort_order: number }) =>
          a.sort_order - b.sort_order
      ),
    })) as Project[];
  } catch {
    return seedProjects;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  return (featured.length > 0 ? featured : projects).slice(0, 4);
}

export async function getProject(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getAbout(): Promise<AboutContent> {
  try {
    const sb = await supabase();
    const { data, error } = await sb
      .from("site_content")
      .select("data")
      .eq("key", "about")
      .maybeSingle();
    if (error || !data) return seedAbout;
    return { ...seedAbout, ...(data.data as Partial<AboutContent>) };
  } catch {
    return seedAbout;
  }
}

export async function getContact(): Promise<ContactContent> {
  try {
    const sb = await supabase();
    const { data, error } = await sb
      .from("site_content")
      .select("data")
      .eq("key", "contact")
      .maybeSingle();
    if (error || !data) return seedContact;
    return { ...seedContact, ...(data.data as Partial<ContactContent>) };
  } catch {
    return seedContact;
  }
}
