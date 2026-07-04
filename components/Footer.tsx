import Link from "next/link";

export default function Footer({
  tagline = "Full-grain · Saddle-stitched · Made in Chicago",
  linkHref = "/contact",
  linkLabel = "Get in touch →",
}: {
  tagline?: string;
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <footer className="foot">
      <span>© 2026 Poorly Made Goods</span>
      <span>{tagline}</span>
      <Link href={linkHref}>{linkLabel}</Link>
    </footer>
  );
}
