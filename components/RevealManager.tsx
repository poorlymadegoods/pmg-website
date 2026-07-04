"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Generic scroll reveal: any .rv element fades/rises into place as it
 * enters the viewport. Elements rendered with `.rv.in` (hero content)
 * are visible immediately. Re-runs on client-side navigation.
 */
export default function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    if (!els.length) return;

    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
