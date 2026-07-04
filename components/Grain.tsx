"use client";

import { useEffect, useRef } from "react";

/**
 * Film-grain overlay. The noise tile is drawn on a canvas at runtime
 * (no network fetch) and applied as a background image; the CSS `grain`
 * keyframes jitter it. Disabled for prefers-reduced-motion via CSS.
 */
export default function Grain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const c = document.createElement("canvas");
    c.width = c.height = 180;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const d = ctx.createImageData(180, 180);
    const p = d.data;
    for (let i = 0; i < p.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      p[i] = p[i + 1] = p[i + 2] = v;
      p[i + 3] = 255;
    }
    ctx.putImageData(d, 0, 0);
    el.style.backgroundImage = `url(${c.toDataURL()})`;
  }, []);

  return <div ref={ref} className="grain" aria-hidden="true" />;
}
