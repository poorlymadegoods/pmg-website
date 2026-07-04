"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/goods", label: "Goods" },
  { href: "/custom-order", label: "Custom Order" },
  { href: "/contact", label: "Contact" },
];

export default function Nav({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <nav className={className ? `nav ${className}` : "nav"}>
      <Link className="brand" href="/">
        <span className="mark">PMG</span>
        <span className="full">Poorly Made Goods</span>
      </Link>
      <div className="nav-links">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={pathname?.startsWith(l.href) ? "here" : undefined}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
