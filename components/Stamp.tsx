/**
 * Decorative stamp/seal mark. Purely a visual accent — the "press" animation
 * lives in the global .stamp-mark CSS and triggers off the existing .rv/.in
 * scroll-reveal class on the mark's ancestor (see RevealManager).
 */
export default function Stamp({ className }: { className?: string }) {
  return (
    <svg
      className={className ? `stamp-mark ${className}` : "stamp-mark"}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="27" />
      <circle cx="32" cy="32" r="20" />
      <path d="M20 33l8 8 16-18" />
    </svg>
  );
}
