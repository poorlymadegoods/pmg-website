"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-following "magnetic" drift for hover-capable pointers. Attach the
 * returned ref to any element; it nudges toward the cursor within
 * `strength` px while hovered and springs back on leave (relies on the
 * element's own CSS transition for the spring, same as .btn's existing
 * hover transition). No-op on touch devices or reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 14) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const enabled =
      matchMedia("(hover: hover)").matches &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!enabled) return;

    function onMove(e: MouseEvent) {
      const r = el!.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el!.style.transform = `translate(${(x * strength).toFixed(1)}px, ${(
        y * strength
      ).toFixed(1)}px)`;
    }
    function onLeave() {
      el!.style.transform = "";
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}
