"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const links = [
  { href: "/admin", label: "Projects" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "About & Contact" },
];

export default function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await createClient().auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-light/50 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <Image
                src="/brand/dg-mark.png"
                alt="Design Glyph"
                width={28}
                height={35}
                className="h-8 w-auto"
              />
              <span className="label-caps text-[0.6rem] font-semibold text-slate-brand">
                Studio
              </span>
            </Link>
            <nav className="flex items-center gap-5">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-sm transition ${
                    pathname === l.href ||
                    (l.href !== "/admin" && pathname.startsWith(l.href)) ||
                    (l.href === "/admin" && pathname.startsWith("/admin/projects"))
                      ? "font-medium text-slate-ink"
                      : "font-normal text-slate-mid hover:text-slate-ink"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm font-normal text-slate-mid transition hover:text-slate-ink"
            >
              View site ↗
            </Link>
            <button
              onClick={signOut}
              className="rounded-full border border-slate-light px-4 py-1.5 text-xs font-normal text-slate-mid transition hover:border-slate-brand hover:text-slate-ink"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-2xl font-medium tracking-wide text-slate-ink">
          {title}
        </h1>
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}
