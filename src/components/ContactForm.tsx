"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { sendMessage, type ContactFormState } from "@/app/(site)/contact/actions";

const initialState: ContactFormState = { status: "idle", message: "" };

const inputClass =
  "w-full rounded-xl border border-slate-light bg-white px-4 py-3 font-light text-slate-ink placeholder:text-slate-light focus:border-slate-brand focus:outline-none focus:ring-2 focus:ring-slate-brand/15 transition";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-soft flex flex-col items-center rounded-2xl px-8 py-16 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-slate-brand text-2xl text-white">
          ✓
        </span>
        <h3 className="mt-6 text-2xl font-medium text-slate-ink">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm font-light text-slate-mid">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="card-soft rounded-2xl p-8 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-caps mb-2 block text-[0.6rem] font-semibold text-slate-mid">
            Name *
          </label>
          <input id="name" name="name" required placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="label-caps mb-2 block text-[0.6rem] font-semibold text-slate-mid">
            Email *
          </label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="subject" className="label-caps mb-2 block text-[0.6rem] font-semibold text-slate-mid">
          Subject
        </label>
        <input id="subject" name="subject" placeholder="What's this about?" className={inputClass} />
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="label-caps mb-2 block text-[0.6rem] font-semibold text-slate-mid">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell me about your project…"
          className={`${inputClass} resize-y`}
        />
      </div>

      {state.status === "error" && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="label-caps mt-7 inline-flex items-center gap-3 rounded-full bg-slate-brand px-8 py-4 text-[0.65rem] font-semibold text-white transition-all hover:bg-slate-ink hover:shadow-lg disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
