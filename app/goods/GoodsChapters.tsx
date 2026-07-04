"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import PhotoSlot from "@/components/PhotoSlot";
import styles from "./goods.module.css";

type Chapter = {
  key: "c1" | "c2" | "c3";
  alt?: boolean;
  idx: string;
  no: string;
  name: string;
  price: string;
  lede: string;
  ctaHref: string;
  specs: [string, string][];
  photoIcon: React.ReactNode;
  photoLabel: React.ReactNode;
};

const CHAPTERS: Chapter[] = [
  {
    key: "c1",
    idx: "01",
    no: "No.01 — Wallet",
    name: "V-Fold",
    price: "From $130",
    lede: "Eight cards, two sleeves, one piece of full-grain veg tan. Folded once, built to be sat on for a decade.",
    ctaHref: "/custom-order?product=V-Fold",
    specs: [
      ["Leather", "Full-grain veg tan"],
      ["Stitch", "Saddle, waxed linen"],
      ["Edges", "Hand-burnished"],
      ["Made", "One at a time"],
    ],
    photoIcon: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="1.5" />
        <path d="M3 10h18M16 14h2" />
      </>
    ),
    photoLabel: (
      <>
        Product Shot
        <br />
        V-Fold
      </>
    ),
  },
  {
    key: "c2",
    alt: true,
    idx: "02",
    no: "No.02 — Wallet",
    name: "Stash",
    price: "From $110",
    lede: "Six cards in a single fold. No lining, no filler — just leather that molds to what you carry.",
    ctaHref: "/custom-order?product=Stash",
    specs: [
      ["Leather", "Full-grain veg tan"],
      ["Stitch", "Saddle, waxed linen"],
      ["Build", "One-piece fold"],
      ["Made", "One at a time"],
    ],
    photoIcon: (
      <>
        <rect x="3" y="7" width="18" height="10" rx="1.5" />
        <path d="M3 11h18" />
      </>
    ),
    photoLabel: (
      <>
        Product Shot
        <br />
        Stash
      </>
    ),
  },
  {
    key: "c3",
    idx: "03",
    no: "No.03 — Cover",
    name: "Notebook Cover",
    price: "Custom pricing",
    lede: "A jacket for the notebook you actually use. Scuffs, scratches and rain become part of the record.",
    ctaHref: "/custom-order?product=Notebook%20Cover",
    specs: [
      ["Leather", "Full-grain veg tan"],
      ["Fits", "A5 notebooks"],
      ["Edges", "Hand-burnished"],
      ["Made", "One at a time"],
    ],
    photoIcon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <path d="M9 3v18" />
      </>
    ),
    photoLabel: (
      <>
        Product Shot
        <br />
        Notebook Cover
      </>
    ),
  },
];

/**
 * Pinned scroll-zoom chapters. Each chapter is a 320vh scroll region with a
 * sticky 100dvh pin; scroll progress drives the card's scale/opacity and the
 * background numeral's counter-drift (see design handoff motion table).
 * Re-measures after window load and once webfonts settle, since font swaps
 * change layout. Reduced motion renders every chapter fully visible/static.
 */
export default function GoodsChapters() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;

    const items = Array.from(
      rootEl.querySelectorAll<HTMLElement>(`.${styles.chapter}`)
    ).map((ch) => ({
      ch,
      pin: ch.querySelector<HTMLElement>(`.${styles.pin}`)!,
      card: ch.querySelector<HTMLElement>(`.${styles.chCard}`)!,
      idx: ch.querySelector<HTMLElement>(`.${styles.idx}`)!,
    }));

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((it) => {
        it.pin.classList.add(styles.in);
        it.card.style.opacity = "1";
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
        const r = it.ch.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        const total = r.height - vh;
        const p = clamp(-r.top / total, 0, 1);
        const tIn = easeOut(clamp(p / 0.38, 0, 1));
        const tOut = clamp((p - 0.8) / 0.2, 0, 1);
        const s = 0.52 + 0.48 * tIn + 0.1 * tOut;
        const y = (1 - tIn) * vh * 0.18 - tOut * vh * 0.08;
        const o = Math.min(tIn * 1.5, 1) * (1 - tOut);
        it.card.style.transform = `translate(-50%, calc(-50% + ${y.toFixed(
          1
        )}px)) scale(${s.toFixed(3)})`;
        it.card.style.opacity = o.toFixed(3);
        it.idx.style.transform = `translateY(calc(-50% + ${(
          (0.5 - p) *
          22
        ).toFixed(2)}vh))`;
        it.pin.classList.toggle(styles.in, p > 0.3 && p < 0.88);
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
    addEventListener("load", update);
    document.fonts?.ready.then(update);
    update();

    return () => {
      disposed = true;
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      removeEventListener("load", update);
    };
  }, []);

  return (
    <div className={styles.chapters} ref={root}>
      {CHAPTERS.map((c) => (
        <section
          key={c.key}
          className={`${styles.chapter} ${styles[c.key]}${
            c.alt ? ` ${styles.alt}` : ""
          }`}
        >
          <div className={styles.pin}>
            <div className={styles.idx} aria-hidden="true">
              {c.idx}
            </div>
            <div className={styles.chCard}>
              <div className={styles.card}>
                <PhotoSlot icon={c.photoIcon} label={c.photoLabel} />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.no}>{c.no}</div>
              <h2 className={styles.name}>{c.name}</h2>
              <div className={styles.price}>{c.price}</div>
              <p className={styles.chLede}>{c.lede}</p>
              <div className={styles.cta}>
                <Link className="btn" href={c.ctaHref}>
                  Customize this →
                </Link>
              </div>
            </div>
            <div className={styles.specs}>
              {c.specs.map(([k, v]) => (
                <div className="row" key={k}>
                  <span className="k">{k}</span>
                  <span className="v">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
