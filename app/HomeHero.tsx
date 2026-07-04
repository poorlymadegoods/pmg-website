"use client";

import { useEffect, useRef } from "react";
import Nav from "@/components/Nav";
import styles from "./home.module.css";

/**
 * Hero stage with the giant watermark that drifts subtly with the mouse
 * (depth 0.18, lerped at 0.06/frame). Disabled for reduced motion and
 * touch-only devices.
 */
export default function HomeHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const mark = markRef.current;
    if (!stage || !mark) return;

    const enabled =
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      matchMedia("(hover: hover)").matches;
    if (!enabled) return;

    const depth = 0.18;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf: number | null = null;

    function loop() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      mark!.style.transform = `translate3d(${(-cx * depth).toFixed(2)}px, ${(
        -cy * depth
      ).toFixed(2)}px, 0)`;
      raf =
        Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1
          ? requestAnimationFrame(loop)
          : null;
    }
    function onMove(e: MouseEvent) {
      const r = stage!.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 46;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 30;
      if (raf === null) raf = requestAnimationFrame(loop);
    }
    function reset() {
      tx = 0;
      ty = 0;
      if (raf === null) raf = requestAnimationFrame(loop);
    }

    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", reset);
    return () => {
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", reset);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.stage} ref={stageRef}>
      <div className={styles.watermark} ref={markRef} aria-hidden="true">
        <span>POORLY</span>
        <span>MADE</span>
        <span>GOODS</span>
      </div>

      <Nav className="rv in" />

      <div className={styles.heroCopy}>
        <div className="eyebrow rv in" style={{ "--d": ".1s" } as React.CSSProperties}>
          <span className="dot" /> Est. 2016 · A small workshop · Full-grain
          leather
        </div>
        <h1
          className={`${styles.headline} h-display rv in`}
          style={{ "--d": ".2s" } as React.CSSProperties}
        >
          Poorly Named.
          <span className={styles.l2}>
            Made <em>Exceptionally</em> Well.
          </span>
        </h1>
        <p
          className={`${styles.lede} rv in`}
          style={{ "--d": ".34s" } as React.CSSProperties}
        >
          Hand-cut, saddle-stitched, and stamped one piece at a time. We named
          it poorly so the work could do the talking.
        </p>
      </div>

      <div className={styles.heroIndex}>
        <div
          className={`${styles.lab} rv in`}
          style={{ "--d": ".25s" } as React.CSSProperties}
        >
          Cut &amp; stitched in Chicago
        </div>
        <div className="down rv in" style={{ "--d": ".4s" } as React.CSSProperties}>
          Scroll <span className="bar" />
        </div>
      </div>
    </div>
  );
}
