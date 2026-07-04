"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT_EMAIL, FORMSPREE_FORM_ID, SESSION_KEYS } from "@/lib/config";
import styles from "./contact.module.css";

const REASONS = [
  "Custom Order",
  "General Inquiry",
  "Wholesale",
  "Repair",
  "Other",
];

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [copyHref, setCopyHref] = useState<string | null>(null);

  /* pre-fill Reason + Message when arriving from Custom Order or a link.
     Read from window.location instead of useSearchParams so the form still
     prerenders into the static HTML export. */
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("reason");
    if (r && REASONS.includes(r)) setReason(r);
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEYS.orderSummary);
    if (saved) {
      setMessage((prev) => saved + "\n" + prev);
      sessionStorage.removeItem(SESSION_KEYS.orderSummary);
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);

    // honeypot: silently drop likely-bot submissions
    if (String(data.get("company") ?? "").trim()) {
      setStatus("Thanks — we'll be in touch.");
      form.reset();
      setReason("");
      setMessage("");
      return;
    }
    if (!form.reportValidity()) return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const why = String(data.get("reason") ?? "");
    const msg = String(data.get("message") ?? "").trim();
    const subject = `Poorly Made Goods — ${why || "Contact"} — ${name}`;
    const record =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      (phone ? `Phone: ${phone}\n` : "") +
      `Reason: ${why}\n\n` +
      msg;

    if (!FORMSPREE_FORM_ID) {
      // No form service configured yet — fall back to the visitor's email
      // client with everything pre-filled (see lib/config.ts to upgrade).
      setStatus("Opening your email client…");
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(record)}`;
      return;
    }

    setSending(true);
    setStatus("Sending…");
    setCopyHref(null);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: (() => {
          const fd = new FormData();
          fd.set("name", name);
          fd.set("email", email);
          if (phone) fd.set("phone", phone);
          fd.set("reason", why);
          fd.set("message", msg);
          fd.set("_subject", subject);
          // CC the customer a copy — honored on paid Formspree plans,
          // silently ignored on the free plan (see the on-screen
          // "Email yourself a copy" fallback below).
          fd.set("_cc", email);
          return fd;
        })(),
      });
      if (res.ok) {
        setStatus("Sent — thanks! We'll get back to you soon.");
        // Give the customer a record of what they sent: a pre-filled
        // email to their own address with the full submission.
        setCopyHref(
          `mailto:${email}?subject=${encodeURIComponent(
            `Your copy — ${subject}`
          )}&body=${encodeURIComponent(
            `Copy of your request to Poorly Made Goods (${CONTACT_EMAIL}):\n\n${record}`
          )}`
        );
        form.reset();
        setReason("");
        setMessage("");
      } else {
        setStatus(`Something went wrong — please email ${CONTACT_EMAIL}.`);
      }
    } catch {
      setStatus(`Network error — please email ${CONTACT_EMAIL}.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <form className="panel rv" ref={formRef} onSubmit={onSubmit} noValidate>
        <div className={styles.gridFields}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="name">
                Full Name <span className="req">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="name"
                placeholder="Jane Doe"
              />
            </div>
            <div className="field">
              <label htmlFor="email">
                Email <span className="req">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                placeholder="jane@email.com"
              />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                placeholder="(optional)"
              />
            </div>
            <div className="field">
              <label htmlFor="reason">
                Reason for Contact <span className="req">*</span>
              </label>
              <select
                id="reason"
                name="reason"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="" disabled>
                  Choose one…
                </option>
                {REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="message">
              Message <span className="req">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              placeholder="Tell us what you're after…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* honeypot field: real visitors never see or fill this */}
          <div className={styles.hp} aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className={styles.submitRow}>
            <button type="submit" className="btn primary" disabled={sending}>
              Send Message →
            </button>
            <span className={styles.status} role="status">
              {status}
            </span>
          </div>
          {copyHref && (
            <div className={styles.submitRow}>
              <a className="btn" href={copyHref}>
                Email yourself a copy →
              </a>
            </div>
          )}
          <p className="form-note">
            {FORMSPREE_FORM_ID ? (
              <>
                Your message goes straight to{" "}
                <strong style={{ color: "var(--ink)" }}>{CONTACT_EMAIL}</strong>
                — usually a reply within 2 business days.
              </>
            ) : (
              <>
                Submitting opens your email client with everything filled in,
                addressed to{" "}
                <strong style={{ color: "var(--ink)" }}>{CONTACT_EMAIL}</strong>{" "}
                — just hit send from there.
              </>
            )}
          </p>
        </div>
      </form>

      <div
        className={`${styles.direct} rv`}
        style={{ "--d": ".1s" } as React.CSSProperties}
      >
        <div className={styles.item}>
          <span className={styles.k}>Email</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <div className={styles.item}>
          <span className={styles.k}>Workshop</span>Chicago, Illinois
        </div>
        <div className={styles.item}>
          <span className={styles.k}>Hours</span>By appointment
        </div>
      </div>
    </div>
  );
}
