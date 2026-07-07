import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { getContact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Rachel Panigel — Design Glyph.",
};

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <div>
      <section className="relative overflow-hidden pb-14 pt-36">
        <div className="glyph-pattern pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="label-caps text-[0.65rem] font-semibold text-slate-mid">
              Contact
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-wide text-slate-ink sm:text-5xl">
              Let&apos;s make something special.
            </h1>
            <p className="mt-5 max-w-xl text-lg font-normal leading-relaxed text-slate-mid">
              {contact.blurb}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-6">
              <div className="card-soft rounded-2xl p-8">
                <p className="label-caps text-[0.6rem] font-semibold text-slate-mid">
                  Phone
                </p>
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                  className="mt-2 block text-xl font-normal text-slate-ink transition hover:text-slate-brand"
                >
                  {contact.phone}
                </a>
              </div>
              <div className="card-soft rounded-2xl p-8">
                <p className="label-caps text-[0.6rem] font-semibold text-slate-mid">
                  Email
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-2 block break-all text-xl font-normal text-slate-ink transition hover:text-slate-brand"
                >
                  {contact.email}
                </a>
              </div>
              <div className="card-soft relative overflow-hidden rounded-2xl bg-slate-brand p-8">
                <div className="glyph-pattern pointer-events-none absolute inset-0 opacity-40 invert" />
                <p className="label-caps relative text-[0.6rem] font-semibold text-slate-light">
                  Design Glyph Studio
                </p>
                <p className="relative mt-2 text-xl font-normal text-white">
                  {contact.location}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
