/**
 * Product line, tanneries, and material palettes — sourced from the client's
 * reference build (see design handoff README). Prices are starting prices.
 */

export type LeatherColor = { name: string; hex: string; limited?: boolean };

export type Product = {
  name: string;
  /** Starting price in USD; 0 means custom pricing (quoted after review). */
  price: number;
  priced: boolean;
};

export const PRODUCTS: Product[] = [
  { name: "V-Fold", price: 130, priced: true },
  { name: "Stash", price: 110, priced: true },
  { name: "Notebook Cover", price: 0, priced: false },
];

export type Tannery = {
  name: string;
  leather: string;
  detail: string;
  limited?: boolean;
  colors: LeatherColor[];
};

export const TANNERIES: Tannery[] = [
  {
    name: "Badalassi Carlo",
    leather: "Pueblo Veg Tan",
    detail:
      "Pueblo Veg Tan — Italy. Pull-up leather with a rich, waxy finish. Develops a deep patina over time.",
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Turquoise", hex: "#2a8b8b" },
      { name: "Navy Blue", hex: "#1a2a4a" },
      { name: "Yellow", hex: "#d4a017" },
    ],
  },
  {
    name: "Conceria Walpier",
    leather: "Buttero Veg Tan",
    detail: "Buttero Veg Tan — Italy. Firm, tight grain, clean edges.",
    limited: true,
    colors: [
      { name: "Black", hex: "#1a1a1a", limited: true },
      { name: "Olive", hex: "#556b2f", limited: true },
    ],
  },
];

/** V-Fold interior pieces always draw from the Badalassi Carlo palette. */
export const INTERIOR_PALETTE: LeatherColor[] = TANNERIES[0].colors;

export const THREAD_COLORS: LeatherColor[] = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#e8e8e8" },
];

export function money(n: number): string {
  return "$" + n.toFixed(0);
}
