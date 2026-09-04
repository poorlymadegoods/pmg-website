"use client";

import { usePathname } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";

const LINKS = [
  { href: "/goods", label: "Goods" },
  { href: "/custom-order", label: "Custom Order" },
  { href: "/contact", label: "Contact" },
];

export default function Nav({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <nav className={className ? `nav ${className}` : "nav"}>
      <TransitionLink className="brand" href="/">
        <span className="mark">PMG</span>
        <span className="full">Poorly Made Goods</span>
      </TransitionLink>
      <div className="nav-links">
        {LINKS.map((l) => (
          <TransitionLink
            key={l.href}
            href={l.href}
            className={pathname?.startsWith(l.href) ? "here" : undefined}
          >
            {l.label}
          </TransitionLink>
        ))}
      </div>
    </nav>
  );
}
