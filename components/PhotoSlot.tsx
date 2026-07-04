import type { ReactNode } from "react";

/**
 * A photo position. Final photography is pending — until a `src` is
 * provided, this renders the hatched placeholder from the design.
 *
 * To drop in a real photo: put the file in /public/photos and pass
 * src="/photos/your-file.jpg" (plus alt text) where this is used.
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
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="slot-img" src={src} alt={alt} />;
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
