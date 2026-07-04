import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import OrderBuilder from "./OrderBuilder";
import styles from "./custom-order.module.css";

export const metadata: Metadata = {
  title: "Custom Order",
  description:
    "Build your own leather piece: pick a product, tannery, and colors, add personalization, and request a custom build. $50 deposit only after review.",
};

export default function CustomOrderPage() {
  return (
    <>
      <Nav />

      <header className={styles.opener}>
        <div className="eyebrow rv in">
          <span className="dot" /> Custom Order · Built to your spec
        </div>
        <h1
          className="h-display rv in"
          style={{ "--d": ".1s" } as React.CSSProperties}
        >
          Design your own,
          <br />
          one hide at a time.
        </h1>
        <p
          className={`${styles.lede} rv in`}
          style={{ "--d": ".22s" } as React.CSSProperties}
        >
          Pick a piece, choose your tannery and colors, add personalization if
          you&apos;d like it. A $50 deposit is requested once your order is
          reviewed and accepted — before that, nothing is charged.
        </p>
      </header>

      <OrderBuilder />

      <Footer tagline="Full-grain · Veg Tan · Made in Chicago" />
    </>
  );
}
