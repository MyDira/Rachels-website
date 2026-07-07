import type { AboutContent, ContactContent, Project } from "./types";

/**
 * Built-in content sourced from Rachel's portfolio booklet.
 * Used as a fallback whenever the Supabase tables are missing or empty,
 * so the site is fully browsable before (and without) a database.
 */

const img = (
  project_id: string,
  entries: [string, string | null][]
) =>
  entries.map(([url, caption], i) => ({
    id: `${project_id}-img-${i}`,
    project_id,
    url,
    caption,
    sort_order: i,
  }));

export const seedProjects: Project[] = [
  {
    id: "seed-bengo",
    slug: "bengo",
    title: "Bengo",
    tagline: "A Whole New Meaning to Lunch",
    description:
      "Bengo is an American brand aimed at creating a healthier and more convenient way to give children the proper nutrition they need for their school lunch. Bengo specializes in creating meals that kids will enjoy while also getting the right nutrients and diet. The identity spans packaging, advertising and a full mobile ordering app.",
    brand_font: "Omnes",
    attributes: ["Happy", "Healthy", "Creative"],
    work_type: ["Branding", "Packaging", "UI/UX"],
    palette: ["#F5A96C", "#3E5622", "#FBF3E4", "#E3E88C"],
    logo_url: "/portfolio/logos/bengo.png",
    cover_url: "/portfolio/covers/bengo.jpg",
    featured: true,
    sort_order: 1,
    images: img("seed-bengo", [
      ["/portfolio/pages/page04.jpg", "Brand identity, palette and packaging"],
      ["/portfolio/pages/page05.jpg", "Advertising campaign"],
      ["/portfolio/pages/page06.jpg", "Mobile ordering app — UI design"],
      ["/portfolio/extra/bengo-mockup.png", "Lunch box packaging mockup"],
    ]),
  },
  {
    id: "seed-quota",
    slug: "quota",
    title: "Quota",
    tagline: "Your art, on anything",
    description:
      "Quota is a printify shop that allows you to take whatever art or design of your choice and put it on your wall or even everyday items. The system flexes from stationery to poster series — including a typographic tribute to Paula Scher — and pattern-wrapped tote bags inspired by Art Deco, Bauhaus and Russian Constructivism.",
    brand_font: "Avenir",
    attributes: ["Stylish", "Impactful", "Historic"],
    work_type: ["Branding", "Poster Design", "Product Design"],
    palette: ["#C41E2F", "#1F1F1F", "#3D3D3D"],
    logo_url: "/portfolio/logos/quota.png",
    cover_url: "/portfolio/covers/quota.jpg",
    featured: true,
    sort_order: 2,
    images: img("seed-quota", [
      ["/portfolio/pages/page07.jpg", "Brand identity and stationery"],
      ["/portfolio/pages/page08.jpg", "Paula Scher typographic poster series"],
      ["/portfolio/pages/page09.jpg", "Tote bags — Art Deco, Bauhaus, Constructivism"],
      ["/portfolio/extra/quota-pattern.png", "Brand pattern"],
    ]),
  },
  {
    id: "seed-inkwell",
    slug: "inkwell",
    title: "Inkwell",
    tagline: "A foundry for modern type",
    description:
      "Inkwell is an up-and-coming font foundry, specializing in modern fonts for more futuristic and modern works. The identity includes stationery, a poster series celebrating Cooper Black, and Vexen — a fully self-made display typeface designed letter by letter.",
    brand_font: "Iowan Old Style Roman",
    attributes: ["Rooted", "Organized", "Balanced"],
    work_type: ["Branding", "Type Design"],
    palette: ["#2B3A67", "#1B1B1B", "#F5F1E3"],
    logo_url: "/portfolio/logos/inkwell.png",
    cover_url: "/portfolio/covers/inkwell.jpg",
    featured: false,
    sort_order: 3,
    images: img("seed-inkwell", [
      ["/portfolio/pages/page10.jpg", "Brand identity and stationery"],
      ["/portfolio/pages/page11.jpg", "Vexen — a self-made typeface"],
      ["/portfolio/pages/page12.jpg", "Cooper Black poster series"],
      ["/portfolio/extra/inkwell-mockup.png", "Stationery mockup"],
    ]),
  },
  {
    id: "seed-legere",
    slug: "legere",
    title: "Legere",
    tagline: "A French literature magazine",
    description:
      "Legere is a French literature magazine featuring different works throughout history. The brand system covers stationery, subscription cards and a run of magazine covers and editorial spreads on Shakespeare, Mary Shelley and the Brothers Grimm.",
    brand_font: "Gill Sans",
    attributes: ["Sophisticated", "Elegant", "Cultured"],
    work_type: ["Branding", "Editorial Design"],
    palette: ["#8C3B1B", "#EFE6D8", "#C9A98E"],
    logo_url: "/portfolio/logos/legere.png",
    cover_url: "/portfolio/covers/legere.jpg",
    featured: true,
    sort_order: 4,
    images: img("seed-legere", [
      ["/portfolio/pages/page13.jpg", "Brand identity and stationery"],
      ["/portfolio/pages/page14.jpg", "Magazine covers"],
      ["/portfolio/pages/page15.jpg", "Editorial spreads"],
      ["/portfolio/extra/legere-mockup.png", "Cover mockup"],
    ]),
  },
  {
    id: "seed-pomme",
    slug: "pomme",
    title: "Pomme?",
    tagline: "Potatoes Done Right",
    description:
      "Pomme specializes in the art of the potato. From french fries to loaded potatoes, Pomme has everything potato — all tasty and fresh. The identity rolls across stationery, a die-cut potato menu, cups, bags, aprons and a food truck.",
    brand_font: "Brother 1816",
    attributes: ["Fun", "Relaxed", "Tasty"],
    work_type: ["Branding", "Packaging", "Menu Design"],
    palette: ["#6B4423", "#F0E3C9", "#C9A876"],
    logo_url: "/portfolio/logos/pomme.png",
    cover_url: "/portfolio/covers/pomme.jpg",
    featured: true,
    sort_order: 5,
    images: img("seed-pomme", [
      ["/portfolio/pages/page16.jpg", "Brand identity and stationery"],
      ["/portfolio/pages/page17.jpg", "Menu and packaging system"],
      ["/portfolio/pages/page18.jpg", "Food truck livery"],
      ["/portfolio/extra/pomme-mockup.jpg", "Packaging mockup"],
    ]),
  },
  {
    id: "seed-wordle",
    slug: "wordle",
    title: "Wordle",
    tagline: "Nostalgia, dealt by hand",
    description:
      "Wordle is a card gaming company, creating nostalgic times when card games would create memories. The monochrome identity extends into a deck of typographic playing cards where each face is drawn entirely from words.",
    brand_font: "Brevia",
    attributes: ["Fun", "Interactive", "Unique"],
    work_type: ["Branding", "Packaging", "Illustration"],
    palette: ["#1A1A1A", "#B3B3B3", "#F2F7F5"],
    logo_url: "/portfolio/logos/wordle.jpg",
    cover_url: "/portfolio/covers/wordle.jpg",
    featured: false,
    sort_order: 6,
    images: img("seed-wordle", [
      ["/portfolio/pages/page19.jpg", "Brand identity and card box"],
      ["/portfolio/pages/page20.jpg", "Typographic playing cards"],
    ]),
  },
  {
    id: "seed-cutcraft",
    slug: "cut-craft",
    title: "Cut Craft",
    tagline: "Patterns for living",
    description:
      "Cut Craft specializes in custom patterns and designs for all your linens and bedding needs. The identity pairs a circular monogram with a family of repeat patterns designed for pillows, linens and interiors.",
    brand_font: "Gill Sans",
    attributes: ["Artistic", "Colorful", "Creative"],
    work_type: ["Branding", "Pattern Design"],
    palette: ["#C9A227", "#1A1A1A", "#EAF5F9"],
    logo_url: null,
    cover_url: "/portfolio/covers/cutcraft.jpg",
    featured: false,
    sort_order: 7,
    images: img("seed-cutcraft", [
      ["/portfolio/pages/page21.jpg", "Brand identity and stationery"],
      ["/portfolio/pages/page22.jpg", "Pattern collection in the home"],
      ["/portfolio/extra/pattern-1.png", "Repeat pattern I"],
      ["/portfolio/extra/pattern-2.png", "Repeat pattern II"],
      ["/portfolio/extra/pattern-3.png", "Repeat pattern III"],
      ["/portfolio/extra/pattern-4.png", "Repeat pattern IV"],
    ]),
  },
  {
    id: "seed-novella",
    slug: "novella",
    title: "Novella Publishing",
    tagline: "An adventure with each read",
    description:
      "Novella is a publishing company that puts literature as its highest priority. It makes sure to provide new books with insightful content, having an adventure with each read. The identity spans stationery, bookmarks and the Lights–Camera–Action book trilogy.",
    brand_font: "Avenir Next",
    attributes: ["Insightful", "Adventurous", "Expressive"],
    work_type: ["Branding", "Book & Cover Design"],
    palette: ["#7D7D7D", "#EDE6D1", "#1C1C1C"],
    logo_url: "/portfolio/logos/novella.jpg",
    cover_url: "/portfolio/covers/novella.jpg",
    featured: false,
    sort_order: 8,
    images: img("seed-novella", [
      ["/portfolio/pages/page23.jpg", "Brand identity and stationery"],
      ["/portfolio/pages/page24.jpg", "Lights · Camera · Action — book series"],
    ]),
  },
  {
    id: "seed-roarkids",
    slug: "roar-kids",
    title: "Roar Kids",
    tagline: "Where animals come to life",
    description:
      "Roar Kids is a children's boutique where animals come to life with chic-looking animal print clothes. Each animal is illustrated entirely out of its own letters, printed across onesies and tees for little explorers.",
    brand_font: "Portofino",
    attributes: ["Playful", "Adventurous", "Kid-friendly"],
    work_type: ["Branding", "Apparel Design", "Illustration"],
    palette: ["#F08A24", "#2B5B9E", "#FFFFFF"],
    logo_url: "/portfolio/logos/roarkids.jpg",
    cover_url: "/portfolio/covers/roarkids.jpg",
    featured: false,
    sort_order: 9,
    images: img("seed-roarkids", [
      ["/portfolio/pages/page25.jpg", "Brand identity and packaging"],
      ["/portfolio/pages/page26.jpg", "Typographic animal onesies"],
      ["/portfolio/pages/page27.jpg", "Kids tee collection"],
    ]),
  },
  {
    id: "seed-designglyph",
    slug: "design-glyph",
    title: "Design Glyph",
    tagline: "Rachel's own studio brand",
    description:
      "DesignGlyph is my brand. We specialize in simplistic yet affective designs. I chose the name DesignGlyph to show that just like a glyph is a special character, here at DesignGlyph we make sure to add a special something to every project.",
    brand_font: "Futura",
    attributes: ["Simplistic", "Innovative", "Expansive"],
    work_type: ["Brand Identity"],
    palette: ["#4C5E68", "#7E8F99", "#B9C9D2", "#EAF5F9"],
    logo_url: "/brand/dg-mark.png",
    cover_url: "/portfolio/covers/designglyph.jpg",
    featured: false,
    sort_order: 10,
    images: img("seed-designglyph", [
      ["/portfolio/pages/page03.jpg", "Identity system and stationery"],
      ["/portfolio/pages/page01.jpg", "The DG monogram"],
      ["/portfolio/pages/page28.jpg", "Closing spread"],
    ]),
  },
];

export const seedAbout: AboutContent = {
  heading: "Design is a solution to a problem.",
  intro:
    "I'm Rachel — the designer behind Design Glyph. I hold a BA in Digital Multimedia Design with a minor in Marketing from Touro University, and I design brands that solve problems beautifully.",
  body:
    "Just like a glyph is a special character, I make sure to add a special something to every project. My work spans complete brand identities — logos, packaging, stationery, editorial design, patterns, posters and app interfaces — and even a self-made typeface. Since 2023 I've been freelancing for clients across Brooklyn and beyond: brand and packaging design, fundraisers and posters, each built with fresh and creative ideas.\n\nBeyond client work, I've taught Photoshop, photography and computer skills to high school students — because good design thinking is worth passing on.",
  skills: [
    "Brand Identity",
    "Logo Design",
    "Packaging",
    "Editorial & Layout",
    "Typography & Type Design",
    "Pattern Design",
    "Poster Design",
    "App UI Design",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe InDesign",
    "Photography",
  ],
  education:
    "BA in Digital Multimedia Design, Minor in Marketing — Touro University, Brooklyn NY",
  photo_url: null,
};

export const seedContact: ContactContent = {
  phone: "(347) 926-9645",
  email: "Rachelpanigel@gmail.com",
  location: "Brooklyn, New York",
  blurb:
    "Have a brand to build, a project to launch, or just an idea that needs a special something? I'd love to hear about it.",
};
