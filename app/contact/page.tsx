import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about a custom build, repairs, or wholesale — get in touch with Poorly Made Goods, Chicago. Usually a reply within 2 business days.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />

      <header className={styles.opener}>
        <div className="eyebrow rv in">
          <span className="dot" /> Contact · Usually a reply within 2 business
          days
        </div>
        <h1
          className="h-display rv in"
          style={{ "--d": ".1s" } as React.CSSProperties}
        >
          Get in touch.
        </h1>
        <p
          className={`${styles.lede} rv in`}
          style={{ "--d": ".22s" } as React.CSSProperties}
        >
          Questions about a custom build, repairs, wholesale, or anything else
          — write in below and it&apos;ll land straight in our inbox.
        </p>
      </header>

      <ContactForm />

      <Footer linkHref="/goods" linkLabel="See the goods →" />
    </>
  );
}
