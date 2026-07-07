"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("That didn't work — check the email and password.");
      setBusy(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="glyph-pattern flex min-h-screen items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="card-soft w-full max-w-sm rounded-3xl p-10"
      >
        <Image
          src="/brand/dg-mark.png"
          alt="Design Glyph"
          width={56}
          height={70}
          className="mx-auto h-16 w-auto"
        />
        <h1 className="label-caps mt-6 text-center text-[0.65rem] font-semibold text-slate-mid">
          The Studio
        </h1>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-slate-light bg-white px-4 py-3 font-normal text-slate-ink placeholder:text-slate-light focus:border-slate-brand focus:outline-none focus:ring-2 focus:ring-slate-brand/15"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-slate-light bg-white px-4 py-3 font-normal text-slate-ink placeholder:text-slate-light focus:border-slate-brand focus:outline-none focus:ring-2 focus:ring-slate-brand/15"
          />
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="label-caps mt-2 rounded-full bg-slate-brand py-3.5 text-[0.65rem] font-semibold text-white transition hover:bg-slate-ink disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Enter"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
