"use client";

import { useState, type ReactNode } from "react";

/**
 * A photo position. Each slot is pre-wired to a filename under
 * /public/photos — when that file exists it renders; until then (or if
 * the file 404s) the design's hatched placeholder shows instead. To add
 * a photo, just upload it to public/photos with the expected name.
 */
export default function PhotoSlot({
  src,
  alt = "",
  icon,
  label,
}: {
  src?: string;
  alt?: string;
  icon: ReactNode;
  label: ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="slot-img"
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className="slot-ph">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        {icon}
      </svg>
      {label}
    </div>
  );
}
