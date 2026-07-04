"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PRODUCTS,
  TANNERIES,
  INTERIOR_PALETTE,
  THREAD_COLORS,
  money,
  type LeatherColor,
} from "@/lib/catalog";
import { SESSION_KEYS } from "@/lib/config";
import styles from "./custom-order.module.css";

function makeOrderRef(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `PMG-${ts}-${rand}`;
}

function ChipGrid({
  colors,
  value,
  onPick,
}: {
  colors: LeatherColor[];
  value: string | null;
  onPick: (name: string) => void;
}) {
  return (
    <div className={styles.chipGrid}>
      {colors.map((c) => (
        <button
          type="button"
          key={c.name}
          className={`${styles.chip}${
            value === c.name ? ` ${styles.selected}` : ""
          }`}
          onClick={() => onPick(c.name)}
          aria-pressed={value === c.name}
        >
          <div className={styles.chipDot} style={{ background: c.hex }} />
          <div className={styles.chipName}>{c.name}</div>
          {c.limited && <div className={styles.chipLimited}>Limited</div>}
        </button>
      ))}
    </div>
  );
}

export default function OrderBuilder() {
  const router = useRouter();

  const [productName, setProductName] = useState<string | null>(null);
  const [tanneryName, setTanneryName] = useState<string | null>(null);
  const [leatherColor, setLeatherColor] = useState<string | null>(null);
  const [thread, setThread] = useState<string | null>(null);
  const [pocket, setPocket] = useState<string | null>(null);
  const [divider, setDivider] = useState<string | null>(null);
  const [initials, setInitials] = useState("");
  const [engraving, setEngraving] = useState("");
  const [notes, setNotes] = useState("");

  /* pre-select product from ?product= (linked from Goods "Customize this").
     Read from window.location instead of useSearchParams so the form still
     prerenders into the static HTML export. */
  useEffect(() => {
    const pre = new URLSearchParams(window.location.search).get("product");
    if (pre && PRODUCTS.some((p) => p.name === pre)) {
      setProductName(pre);
    }
  }, []);

  const product = PRODUCTS.find((p) => p.name === productName) ?? null;
  const tannery = TANNERIES.find((t) => t.name === tanneryName) ?? null;
  const isVFold = productName === "V-Fold";

  function pickProduct(name: string) {
    setProductName(name);
    setPocket(null);
    setDivider(null);
  }
  function pickTannery(name: string) {
    setTanneryName(name);
    setLeatherColor(null);
    setThread(null);
    setPocket(null);
    setDivider(null);
  }

  const baseOk = product && tannery && leatherColor && thread;
  const vfoldOk = !isVFold || (pocket && divider);
  const canSubmit = Boolean(baseOk && vfoldOk);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !product || !tannery) return;

    const ref = makeOrderRef();
    const mono = initials.trim();
    const summary =
      `Custom Order Request — Ref. ${ref}\n` +
      `— Product: ${product.name}${
        product.priced
          ? ` (starting at ${money(product.price)})`
          : " (custom pricing)"
      }\n` +
      `— Tannery: ${tannery.name} — ${tannery.leather}\n` +
      `— Shell Color: ${leatherColor}\n` +
      `— Thread Color: ${thread}\n` +
      (isVFold
        ? `— Internal Pocket: ${pocket}\n— Pocket Divider: ${divider}\n`
        : "") +
      `— Initials: ${mono || "None"}\n` +
      (engraving.trim() ? `— Laser Engraving: ${engraving.trim()}\n` : "") +
      (notes.trim() ? `— Notes: ${notes.trim()}\n` : "") +
      "\nA $50 deposit will be requested by email if this order is accepted.";

    sessionStorage.setItem(SESSION_KEYS.orderSummary, summary);
    sessionStorage.setItem(SESSION_KEYS.orderRef, ref);
    router.push("/contact?reason=Custom%20Order");
  }

  return (
    <form className={styles.builder} onSubmit={onSubmit}>
      <div>
        <div className="panel rv">
          <h3 className={styles.panelTitle}>The Piece</h3>
          <div className={styles.gridFields}>
            <div className="field">
              <label>
                Product <span className="req">*</span>
              </label>
              <div className={`${styles.optGrid} ${styles.cols3}`}>
                {PRODUCTS.map((p) => (
                  <button
                    type="button"
                    key={p.name}
                    className={`${styles.optCard}${
                      productName === p.name ? ` ${styles.selected}` : ""
                    }`}
                    onClick={() => pickProduct(p.name)}
                    aria-pressed={productName === p.name}
                  >
                    <span className={styles.optName}>{p.name}</span>
                    <span className={styles.optPrice}>
                      {p.priced
                        ? `Starting at ${money(p.price)}`
                        : "Custom pricing"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label>
                Tannery <span className="req">*</span>
              </label>
              <div className={`${styles.optGrid} ${styles.cols2}`}>
                {TANNERIES.map((t) => (
                  <button
                    type="button"
                    key={t.name}
                    className={`${styles.optCard}${
                      tanneryName === t.name ? ` ${styles.selected}` : ""
                    }`}
                    onClick={() => pickTannery(t.name)}
                    aria-pressed={tanneryName === t.name}
                  >
                    <span className={styles.optName}>{t.name}</span>
                    <span className={styles.optDetail}>{t.detail}</span>
                    {t.limited && (
                      <span className={styles.optTag}>Limited Colors</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {tannery && (
              <div className="field">
                <label>
                  Outside Shell Color <span className="req">*</span>
                </label>
                <p className={styles.subnote}>
                  The exterior leather — the first thing people see.
                </p>
                <ChipGrid
                  colors={tannery.colors}
                  value={leatherColor}
                  onPick={setLeatherColor}
                />
              </div>
            )}

            {tannery && leatherColor && (
              <div className="field">
                <label>
                  Thread Color <span className="req">*</span>
                </label>
                <ChipGrid
                  colors={THREAD_COLORS}
                  value={thread}
                  onPick={setThread}
                />
              </div>
            )}

            {isVFold && tannery && leatherColor && (
              <>
                <div className="field">
                  <label>
                    Internal Pocket Color <span className="req">*</span>
                  </label>
                  <p className={styles.subnote}>
                    The pocket panels on the inside of the V-Fold. Can match or
                    contrast the shell.
                  </p>
                  <ChipGrid
                    colors={INTERIOR_PALETTE}
                    value={pocket}
                    onPick={setPocket}
                  />
                </div>
                <div className="field">
                  <label>
                    Pocket Divider Color <span className="req">*</span>
                  </label>
                  <p className={styles.subnote}>
                    The center strip that runs between the two pockets.
                  </p>
                  <ChipGrid
                    colors={INTERIOR_PALETTE}
                    value={divider}
                    onPick={setDivider}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="panel rv" style={{ "--d": ".08s" } as React.CSSProperties}>
          <h3 className={styles.panelTitle}>
            Personalize <span className={styles.opt}>— optional</span>
          </h3>
          <div className={styles.gridFields}>
            <div className="field">
              <label htmlFor="initials">Heat Pressed Initials</label>
              <input
                type="text"
                id="initials"
                name="initials"
                maxLength={5}
                placeholder="e.g. M.L.V"
                style={{ textTransform: "uppercase" }}
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
              />
              <p className={styles.fieldHint}>
                Up to 5 characters, pressed permanently into the leather.
                Format example: M.L.V
              </p>
            </div>
            <div className="field">
              <label htmlFor="engraving">Laser Engraving — Text or Image</label>
              <textarea
                id="engraving"
                name="engraving"
                rows={3}
                placeholder="Describe any text or image you'd like laser engraved, and where (front, interior, back). Max engraving area: 6×6 cm."
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
              />
              <p className={styles.fieldHint}>
                If you have a reference image, mention it here — then email it
                to{" "}
                <strong style={{ color: "var(--ink)" }}>
                  contact@poorlymadegoods.com
                </strong>{" "}
                with your order reference as the subject line once you submit.
              </p>
            </div>
            <div className="field">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Timeline requests, sizing, gift notes…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="panel rv" style={{ "--d": ".12s" } as React.CSSProperties}>
          <div className={styles.deposit}>
            <div className={styles.depositTitle}>⚠ Deposit Required</div>
            <p>
              Once your order is reviewed and accepted, a{" "}
              <strong>$50 deposit</strong> will be requested by email before
              work begins. It&apos;s applied toward your final balance.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${styles.summary} rv`}
        style={{ "--d": ".16s" } as React.CSSProperties}
      >
        <div className="panel">
          <h3 className={styles.panelTitle}>Your Build</h3>
          <div className={styles.sumHead}>
            <div className={styles.sumName}>
              {product ? product.name : "Choose a piece"}
            </div>
            <div className={styles.sumPrice}>
              {product
                ? product.priced
                  ? `${money(product.price)} start`
                  : "Custom quote"
                : "—"}
            </div>
          </div>
          <div className={styles.sumRef}>Ref. will be assigned on submit</div>
          <div className={styles.sumRows}>
            <div className={styles.row}>
              <span className={styles.k}>Tannery</span>
              <span className={styles.v}>
                {tannery ? `${tannery.name} — ${tannery.leather}` : "—"}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.k}>Shell Color</span>
              <span className={styles.v}>{leatherColor ?? "—"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.k}>Thread</span>
              <span className={styles.v}>{thread ?? "—"}</span>
            </div>
            {isVFold && (
              <>
                <div className={styles.row}>
                  <span className={styles.k}>Internal Pocket</span>
                  <span className={styles.v}>{pocket ?? "—"}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.k}>Divider</span>
                  <span className={styles.v}>{divider ?? "—"}</span>
                </div>
              </>
            )}
            <div className={styles.row}>
              <span className={styles.k}>Initials</span>
              <span className={styles.v}>{initials.trim() || "None"}</span>
            </div>
            <div className={`${styles.row} ${styles.total}`}>
              <span className={styles.k}>Starting price</span>
              <span className={styles.v}>
                {product
                  ? product.priced
                    ? `${money(product.price)} +`
                    : "Quoted after review"
                  : "—"}
              </span>
            </div>
          </div>
          <div className={styles.sumCta}>
            <button type="submit" className="btn primary" disabled={!canSubmit}>
              Request This Build →
            </button>
          </div>
          <p className={`form-note ${styles.sumNote}`}>
            This sends your build to our contact form — nothing is charged yet.
            Custom pricing items are quoted after review.
          </p>
        </div>
      </div>
    </form>
  );
}
