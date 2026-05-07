// ============================================================
// utils.js — Shared formatting helpers
// ============================================================

/** Format a number as Indian Rupees (e.g. ₹48,50,000) */
export function fmtPrice(amount) {
  return "₹" + new Intl.NumberFormat("en-IN").format(amount);
}

/** Format kilometres driven (e.g. 12,000 km) */
export function fmtKm(km) {
  return new Intl.NumberFormat("en-IN").format(km) + " km";
}

/** Rough EMI estimate: ~0.95% of price per month */
export function estimateEmi(price) {
  return Math.round(price * 0.0095);
}

/** Return today's date as YYYY-MM-DD for <input type="date" min="..."> */
export function todayISO() {
  return new Date().toISOString().split("T")[0];
}