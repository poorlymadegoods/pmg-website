"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, type AnchorHTMLAttributes, type ReactNode } from "react";

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

/**
 * Drop-in next/link replacement that wraps client-side navigation in the
 * native View Transitions API when the browser supports it, so the paper
 * background / grain persist across a route change instead of hard-cutting.
 * Falls back to a plain Link navigation everywhere else (no support, modifier
 * clicks, etc).
 */
export default function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      !("startViewTransition" in document) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    e.preventDefault();
    document.startViewTransition(() => {
      return new Promise<void>((resolve) => {
        startTransition(() => {
          router.push(href.toString());
        });
        // Wait a couple of frames for the route's DOM to actually paint
        // before the transition snapshot is taken.
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
    });
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
