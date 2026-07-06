import type { SupabaseClient } from "@supabase/supabase-js";
import { seedAbout, seedContact, seedProjects } from "./seed-data";

/**
 * One-click import of the built-in portfolio catalog into Supabase.
 * Runs from the admin (authenticated), so RLS write policies apply.
 */
export async function importStarterContent(supabase: SupabaseClient) {
  for (const p of seedProjects) {
    const { data: inserted, error } = await supabase
      .from("projects")
      .insert({
        slug: p.slug,
        title: p.title,
        tagline: p.tagline,
        description: p.description,
        brand_font: p.brand_font,
        attributes: p.attributes,
        palette: p.palette,
        logo_url: p.logo_url,
        cover_url: p.cover_url,
        featured: p.featured,
        sort_order: p.sort_order,
      })
      .select("id")
      .single();
    if (error) throw error;

    const images = (p.images ?? []).map((im, i) => ({
      project_id: inserted.id,
      url: im.url,
      caption: im.caption,
      sort_order: i,
    }));
    if (images.length > 0) {
      const { error: imgError } = await supabase
        .from("project_images")
        .insert(images);
      if (imgError) throw imgError;
    }
  }

  const { error: aboutError } = await supabase
    .from("site_content")
    .upsert({ key: "about", data: seedAbout });
  if (aboutError) throw aboutError;

  const { error: contactError } = await supabase
    .from("site_content")
    .upsert({ key: "contact", data: seedContact });
  if (contactError) throw contactError;
}
