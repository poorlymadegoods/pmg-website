/**
 * Site-wide configuration.
 *
 * FORMSPREE_FORM_ID: create a free form at https://formspree.io pointed at
 * CONTACT_EMAIL, then paste its ID here (the part after /f/ in the endpoint,
 * e.g. "mqkrgzab"). While this is empty, both forms fall back to the
 * prototype's mailto: behavior (opens the visitor's email client).
 */
export const FORMSPREE_FORM_ID = "";

export const CONTACT_EMAIL = "contact@poorlymadegoods.com";

export const SESSION_KEYS = {
  orderSummary: "pmg_custom_order_summary",
  orderRef: "pmg_order_ref",
} as const;
