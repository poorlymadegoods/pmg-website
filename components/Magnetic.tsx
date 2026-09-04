"use client";

import { cloneElement, isValidElement, type ReactElement } from "react";
import { useMagnetic } from "@/lib/useMagnetic";

/**
 * Wraps a single child element (a button, link, or card) with the magnetic
 * hover drift from useMagnetic, via cloneElement so no extra DOM node is
 * introduced — keeps existing layout/CSS untouched.
 */
export default function Magnetic({
  children,
  strength = 14,
}: {
  children: ReactElement;
  strength?: number;
}) {
  const ref = useMagnetic<HTMLElement>(strength);
  if (!isValidElement(children)) return children;
  return cloneElement(
    children as ReactElement<{ ref?: React.Ref<HTMLElement> }>,
    { ref }
  );
}
