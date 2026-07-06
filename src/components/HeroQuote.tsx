"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * The opening spread of Rachel's portfolio booklet, set in motion.
 *
 *   DESIGN                     ART
 *     is a                      is a
 *   SOLUTION   QUESTION
 *     to a                      to a
 *   PROBLEM             PROBLEM
 *                              — John Maeda
 */

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const drift = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      {/* animated glyph wallpaper + soft glow */}
      <div className="glyph-pattern-drift absolute inset-0 opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.55),transparent_65%)]" />

      <motion.div
        style={{ opacity: fade, y: drift }}
        className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-28 sm:px-10"
      >
        <div className="select-none leading-none text-slate-brand">
          {/* Row 1 — DESIGN and ART slide toward each other */}
          <div className="flex items-end justify-between">
            <motion.span
              initial={{ x: -110, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.15, ease }}
              className="block text-[clamp(1.8rem,7.5vw,6.5rem)] font-semibold tracking-tight"
            >
              DESIGN
            </motion.span>
            <motion.span
              initial={{ x: 110, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.15, ease }}
              className="block text-[clamp(1.8rem,7.5vw,6.5rem)] font-semibold tracking-tight"
            >
              ART
            </motion.span>
          </div>

          {/* Row 2 — the small “is a” lines */}
          <div className="mt-1 flex items-baseline justify-between">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease }}
              className="ml-[6vw] block text-[clamp(0.85rem,2.4vw,2.1rem)] font-light tracking-[0.18em] text-slate-mid"
            >
              IS A
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease }}
              className="block text-[clamp(0.85rem,2.4vw,2.1rem)] font-light tracking-[0.18em] text-slate-mid"
            >
              IS A
            </motion.span>
          </div>

          {/* Row 3 — SOLUTION QUESTION, the giant shared line */}
          <div className="mt-2 flex items-baseline justify-between gap-[3vw]">
            <motion.span
              initial={{ x: -160, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 1.15, ease }}
              className="block text-[clamp(1.55rem,8.5vw,8rem)] font-semibold tracking-tight text-slate-mid"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%), linear-gradient(#7e8f99, #7e8f99)",
                backgroundSize: "250% 100%, 100% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animation: "sheen 5s ease-in-out 2.6s infinite",
              }}
            >
              SOLUTION
            </motion.span>
            <motion.span
              initial={{ x: 160, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 1.15, ease }}
              className="block text-[clamp(1.55rem,8.5vw,8rem)] font-semibold tracking-tight text-slate-mid"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%), linear-gradient(#7e8f99, #7e8f99)",
                backgroundSize: "250% 100%, 100% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animation: "sheen 5s ease-in-out 3s infinite",
              }}
            >
              QUESTION
            </motion.span>
          </div>

          {/* Row 4 — the small “to a” lines */}
          <div className="mt-2 flex items-baseline justify-between">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8, ease }}
              className="ml-[6vw] block text-[clamp(0.85rem,2.4vw,2.1rem)] font-light tracking-[0.18em] text-slate-mid"
            >
              TO A
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8, ease }}
              className="block text-[clamp(0.85rem,2.4vw,2.1rem)] font-light tracking-[0.18em] text-slate-mid"
            >
              TO A
            </motion.span>
          </div>

          {/* Row 5 — PROBLEM PROBLEM rise up */}
          <div className="mt-1 flex items-start justify-between">
            <motion.span
              initial={{ y: 70, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 2.15, ease }}
              className="block text-[clamp(1.6rem,7vw,6rem)] font-semibold tracking-tight"
            >
              PROBLEM
            </motion.span>
            <div className="text-right">
              <motion.span
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, delay: 2.15, ease }}
                className="block text-[clamp(1.6rem,7vw,6rem)] font-semibold tracking-tight"
              >
                PROBLEM
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 2.9, ease }}
                className="mt-3 block text-[clamp(0.95rem,1.6vw,1.35rem)] font-medium italic tracking-[0.14em] text-slate-brand"
              >
                John Maeda
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="label-caps text-[0.55rem] text-slate-mid">Scroll</span>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-slate-light p-1.5">
          <div className="scroll-dot h-1.5 w-1.5 rounded-full bg-slate-brand" />
        </div>
      </motion.div>
    </section>
  );
}
