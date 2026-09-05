"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Dashed SVG thread that "stitches" itself in along the left gutter as the
 * wrapped content scrolls through the viewport. Progress uses the same
 * getBoundingClientRect scroll-fraction approach as the Goods scroll-zoom
 * chapters (see GoodsChapters.tsx) — a fixed dash pattern (the stitch look)
 * is revealed via stroke-dashoffset rather than drawn from scratch.
 */
export default function StitchLine({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!wrap || !svg || !path) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Mirrors the `@media (max-width: 820px)` rule that hides .stitch-svg —
    // skip the scroll/resize work entirely when the line isn't even shown.
    if (matchMedia("(max-width: 820px)").matches) return;
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    let length = 0;
    let ticking = false;

    function layout() {
      const h = wrap!.offsetHeight;
      svg!.setAttribute("height", `${h}`);
      path!.setAttribute("d", `M1,0 L1,${h}`);
      length = path!.getTotalLength();
      path!.style.strokeDashoffset = reduced ? "0" : `${length}`;
    }
    function update() {
      ticking = false;
      if (reduced) return;
      const r = wrap!.getBoundingClientRect();
      const p = clamp((innerHeight - r.top) / (r.height + innerHeight), 0, 1);
      path!.style.strokeDashoffset = `${length * (1 - p)}`;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    layout();
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", layout);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", layout);
    };
  }, []);

  return (
    <div className="stitch-wrap" ref={wrapRef}>
      <svg className="stitch-svg" ref={svgRef} width="2" aria-hidden="true">
        <path ref={pathRef} d="M1,0 L1,0" />
      </svg>
      {children}
    </div>
  );
}
