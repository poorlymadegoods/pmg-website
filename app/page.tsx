import Link from "next/link";
import HomeHero from "./HomeHero";
import Footer from "@/components/Footer";
import PhotoSlot from "@/components/PhotoSlot";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <main className={styles.history}>
        <section className={styles.block}>
          <div className="rv">
            <div className={styles.kicker}>The Why</div>
            <h2 className={styles.title}>Because hands remember.</h2>
            <p className={styles.blockCopy}>
              I started this company because{" "}
              <strong>I love to work with my hands</strong>. Not a slogan — a
              habit I couldn&apos;t shake. And I love that{" "}
              <strong>people use what I make</strong>: a wallet that rides in a
              pocket for ten years, a notebook cover that gets rained on and
              worn smooth. That&apos;s not damage. That&apos;s the point.
            </p>
          </div>
          <div
            className={`${styles.media} rv`}
            style={{ "--d": ".15s" } as React.CSSProperties}
          >
            <div className={styles.card}>
              <PhotoSlot
                icon={<path d="M3 17h18M6 17V9l6-4 6 4v8" />}
                label={
                  <>
                    Workshop Photo
                    <br />
                    The Bench
                  </>
                }
              />
            </div>
            <div className={styles.stamp}>The bench · Chicago</div>
          </div>
        </section>

        <section className={`${styles.block} ${styles.flip}`}>
          <div className="rv">
            <div className={styles.kicker}>The Where</div>
            <h2 className={styles.title}>A home workshop in Chicago.</h2>
            <p className={styles.blockCopy}>
              There&apos;s no factory floor and no production line.{" "}
              <strong>I make everything myself, at home, in Chicago</strong>,
              with high-quality <strong>Italian and French hides</strong>.
              Orders go out when they&apos;re finished — and they&apos;re
              finished when they&apos;re right.
            </p>
          </div>
          <div
            className={`${styles.media} rv`}
            style={{ "--d": ".15s" } as React.CSSProperties}
          >
            <div className={styles.card}>
              <PhotoSlot
                icon={
                  <>
                    <path d="M4 6c3-2 13-2 16 0v12c-3 2-13 2-16 0z" />
                    <path d="M4 10c3 1.5 13 1.5 16 0" />
                  </>
                }
                label={
                  <>
                    Materials Photo
                    <br />
                    The Hides
                  </>
                }
              />
            </div>
            <div className={styles.stamp}>Full-grain · Italian &amp; French</div>
          </div>
        </section>

        <figure className={`${styles.pull} rv`}>
          <blockquote>
            &quot;Named poorly. <span className="acc">Built</span>{" "}
            properly.&quot;
          </blockquote>
          <figcaption>— The maker, Poorly Made Goods · Est. 2016</figcaption>
        </figure>

        <div className={`${styles.ctaRow} rv`}>
          <Link className="btn primary" href="/goods">
            See the Goods
          </Link>
          <Link className="btn" href="/custom-order">
            Build a Custom Order
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
