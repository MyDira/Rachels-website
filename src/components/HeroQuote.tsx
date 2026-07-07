"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * The opening spread of Rachel's portfolio booklet, set in motion.
 *
 *   DESIGN                     ART
 *     is a                      is a
 *   SOLUTION           QUESTION
 *     to a                      to a
 *   PROBLEM             PROBLEM
 *                              — John Maeda
 *
 * Two-column CSS grid: everything in the left column shares a left edge,
 * everything in the right column shares a right edge (so ART, QUESTION and
 * PROBLEM all line up flush right, whatever the screen width). The reveal
 * cascades down the left column first, then down the right column.
 */

const ease = [0.22, 1, 0.36, 1] as const;

// left column, top → bottom, then right column, top → bottom
const D = {
  designL: 0.2,
  isaL: 0.5,
  solution: 0.8,
  toaL: 1.15,
  problemL: 1.45,
  art: 1.95,
  isaR: 2.25,
  question: 2.55,
  toaR: 2.9,
  problemR: 3.2,
  maeda: 3.6,
  cue: 4.1,
};

const big = "text-[clamp(1.8rem,7.2vw,6rem)] font-semibold tracking-tight";
const huge =
  "text-[clamp(1.55rem,8vw,7rem)] font-semibold tracking-tight text-slate-mid";
const problem = "text-[clamp(1.6rem,6.6vw,5.5rem)] font-semibold tracking-tight";
const small =
  "text-[clamp(0.85rem,2.4vw,2.1rem)] font-normal tracking-[0.18em] text-slate-mid";

const sheen = (delay: number) => ({
  backgroundImage:
    "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%), linear-gradient(#7e8f99, #7e8f99)",
  backgroundSize: "250% 100%, 100% 100%",
  WebkitBackgroundClip: "text" as const,
  backgroundClip: "text" as const,
  color: "transparent",
  animation: `sheen 5s ease-in-out ${delay}s infinite`,
});

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
        className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-baseline gap-x-[3vw] gap-y-1 select-none leading-none text-slate-brand">
          {/* Row 1 — DESIGN / ART */}
          <motion.span
            initial={{ x: -110, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: D.designL, ease }}
            className={`justify-self-start ${big}`}
          >
            DESIGN
          </motion.span>
          <motion.span
            initial={{ x: 110, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: D.art, ease }}
            className={`justify-self-end ${big}`}
          >
            ART
          </motion.span>

          {/* Row 2 — is a / is a */}
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: D.isaL, ease }}
            className={`justify-self-start ml-[5vw] ${small}`}
          >
            IS A
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: D.isaR, ease }}
            className={`justify-self-end ${small}`}
          >
            IS A
          </motion.span>

          {/* Row 3 — SOLUTION / QUESTION (the giant shared line) */}
          <motion.span
            initial={{ x: -140, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.0, delay: D.solution, ease }}
            className={`justify-self-start ${huge}`}
            style={sheen(D.solution + 2.4)}
          >
            SOLUTION
          </motion.span>
          <motion.span
            initial={{ x: 140, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.0, delay: D.question, ease }}
            className={`justify-self-end ${huge}`}
            style={sheen(D.question + 2.4)}
          >
            QUESTION
          </motion.span>

          {/* Row 4 — to a / to a */}
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: D.toaL, ease }}
            className={`justify-self-start ml-[5vw] ${small}`}
          >
            TO A
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: D.toaR, ease }}
            className={`justify-self-end ${small}`}
          >
            TO A
          </motion.span>

          {/* Row 5 — PROBLEM / PROBLEM + signature */}
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: D.problemL, ease }}
            className={`justify-self-start ${problem}`}
          >
            PROBLEM
          </motion.span>
          <div className="justify-self-end text-right">
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: D.problemR, ease }}
              className={`block ${problem}`}
            >
              PROBLEM
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: D.maeda, ease }}
              className="mt-3 block text-[clamp(0.95rem,1.6vw,1.35rem)] font-medium italic tracking-[0.14em] text-slate-brand"
            >
              John Maeda
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: D.cue, duration: 1 }}
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
