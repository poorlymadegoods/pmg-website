import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GoodsChapters from "./GoodsChapters";
import styles from "./goods.module.css";

export const metadata: Metadata = {
  title: "Goods",
  description:
    "Three goods, made one at a time: the V-Fold and Stash wallets and the A5 Notebook Cover. Full-grain veg tan, saddle-stitched in Chicago.",
};

export default function GoodsPage() {
  return (
    <>
      <Nav />

      <header className={styles.opener}>
        <div className="eyebrow rv in">
          <span className="dot" /> The Goods · Priced &amp; ready to order
        </div>
        <h1
          className="h-display rv in"
          style={{ "--d": ".1s" } as React.CSSProperties}
        >
          Three goods.
          <br />
          One at a time.
        </h1>
        <p
          className={`${styles.lede} rv in`}
          style={{ "--d": ".22s" } as React.CSSProperties}
        >
          Everything below is cut, stitched, and stamped to order. Photos are
          on their way — for now, scroll through the specs and pricing, or
          start a custom build.
        </p>
      </header>

      <GoodsChapters />

      <section className={styles.closing}>
        <div>
          <div className="eyebrow rv">
            <span className="dot" /> Don&apos;t see quite what you want?
          </div>
          <h2
            className={`h-display ${styles.closingLine} rv`}
            style={{ "--d": ".1s" } as React.CSSProperties}
          >
            Build your own.
          </h2>
          <div
            className={`${styles.closingCta} rv`}
            style={{ "--d": ".2s" } as React.CSSProperties}
          >
            <Link className="btn primary" href="/custom-order">
              Start a Custom Order
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
