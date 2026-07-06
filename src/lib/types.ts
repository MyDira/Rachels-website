export type ProjectImage = {
  id: string;
  project_id: string;
  url: string;
  caption: string | null;
  sort_order: number;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  brand_font: string | null;
  attributes: string[];
  palette: string[];
  logo_url: string | null;
  cover_url: string | null;
  featured: boolean;
  sort_order: number;
  images?: ProjectImage[];
};

export type AboutContent = {
  heading: string;
  intro: string;
  body: string;
  skills: string[];
  education: string;
};

export type ContactContent = {
  phone: string;
  email: string;
  location: string;
  blurb: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
};
