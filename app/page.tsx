import Link from "next/link";
import HomeHero from "./HomeHero";
import ProcessChapters from "./ProcessChapters";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import PhotoSlot from "@/components/PhotoSlot";
import Stamp from "@/components/Stamp";
import StitchLine from "@/components/StitchLine";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <main className={styles.history}>
        <StitchLine>
        <section className={styles.block}>
          <div className="rv">
            <div className={styles.kicker}>
              <Stamp className={styles.kickerStamp} />
              The Why
            </div>
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
            <Magnetic strength={10}>
              <div className={styles.card}>
                <PhotoSlot
                  src="/photos/home-bench.jpg"
                  alt="Where the magic happens at the Poorly Made Goods home workshop in Chicago"
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
            </Magnetic>
            <div className={styles.stamp}>The bench · Chicago</div>
          </div>
        </section>

        <ProcessChapters />

        <section className={`${styles.block} ${styles.flip}`}>
          <div className="rv">
            <div className={styles.kicker}>
              <Stamp className={styles.kickerStamp} />
              The Where
            </div>
            <h2 className={styles.title}>A home workshop in Chicago.</h2>
            <p className={styles.blockCopy}>
              There&apos;s no factory floor and no production line.{" "}
              <strong>I make everything myself, at home, in Chicago</strong>,
              with high-quality <strong>hides</strong>.
              Orders go out when they&apos;re finished — and they&apos;re
              finished when they&apos;re right.
            </p>
          </div>
          <div
            className={`${styles.media} rv`}
            style={{ "--d": ".15s" } as React.CSSProperties}
          >
            <Magnetic strength={10}>
              <div className={styles.card}>
                <PhotoSlot
                  src="/photos/home-hides.jpg"
                  alt="Full-grain Italian and French leather hides"
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
            </Magnetic>
            <div className={styles.stamp}>Full-grain · Beautiful and rich texture</div>
          </div>
        </section>

        <figure className={`${styles.pull} rv`}>
          <Stamp className={styles.pullStamp} />
          <blockquote>
            &quot;Named poorly. <span className="acc">Built</span>{" "}
            properly.&quot;
          </blockquote>
          <figcaption>— Marcos, Poorly Made Goods · Est. 2016</figcaption>
        </figure>
        </StitchLine>

        <div className={`${styles.ctaRow} rv`}>
          <Magnetic strength={12}>
            <Link className="btn primary" href="/goods">
              See the Goods
            </Link>
          </Magnetic>
          <Magnetic strength={12}>
            <Link className="btn" href="/custom-order">
              Build a Custom Order
            </Link>
          </Magnetic>
        </div>
      </main>

      <Footer />
    </>
  );
}
