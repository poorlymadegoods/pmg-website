"use client";

import { useEffect, useRef } from "react";
import styles from "./process.module.css";

const STEPS = [
  {
    no: "01",
    title: "The Hide",
    copy: "Full-grain veg tan, sourced from Italian and French tanneries. Every hide is inspected by hand before it's cut.",
  },
  {
    no: "02",
    title: "The Cut",
    copy: "Patterns are laid by hand and cut with a knife, not a die. No two panels are ever perfectly identical.",
  },
  {
    no: "03",
    title: "The Stitch",
    copy: "Saddle-stitched with waxed linen thread — two needles, one hole, a seam that won't unravel if a single stitch fails.",
  },
  {
    no: "04",
    title: "The Stamp",
    copy: "Edges are hand-burnished, then the piece is stamped, oiled, and signed off before it ships.",
  },
];

/**
 * Pinned scroll sequence for the Home "process" section — same
 * scroll-progress math as the Goods scroll-zoom chapters (see
 * GoodsChapters.tsx), applied to a lighter, text-only layout.
 */
export default function ProcessChapters() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;

    const items = Array.from(
      rootEl.querySelectorAll<HTMLElement>(`.${styles.step}`)
    ).map((step) => ({
      step,
      body: step.querySelector<HTMLElement>(`.${styles.body}`)!,
    }));

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((it) => {
        it.body.style.opacity = "1";
      });
      return;
    }

    const clamp = (v: number, a: number, b: number) =>
      Math.min(b, Math.max(a, v));
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    let ticking = false;
    let disposed = false;

    function update() {
      ticking = false;
      if (disposed) return;
      const vh = innerHeight;
      for (const it of items) {
        const r = it.step.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        const total = r.height - vh;
        const p = clamp(-r.top / total, 0, 1);
        const tIn = easeOut(clamp(p / 0.4, 0, 1));
        const tOut = clamp((p - 0.75) / 0.25, 0, 1);
        const y = (1 - tIn) * 40 - tOut * 24;
        const o = Math.min(tIn * 1.4, 1) * (1 - tOut);
        it.body.style.transform = `translateY(${y.toFixed(1)}px)`;
        it.body.style.opacity = o.toFixed(3);
      }
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    update();

    return () => {
      disposed = true;
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={styles.process} ref={root}>
      {STEPS.map((s) => (
        <section key={s.no} className={styles.step}>
          <div className={styles.pin}>
            <div className={styles.numeral} aria-hidden="true">
              {s.no}
            </div>
            <div className={styles.body}>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepCopy}>{s.copy}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
