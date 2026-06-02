import crypto from "node:crypto";

const SESSION_COOKIE = "homehouse_admin";
const ALLOWLISTED_ADMIN_EMAIL = "amandahummingbird@gmail.com";

export function getAllowlistedEmail() {
  return ALLOWLISTED_ADMIN_EMAIL;
}

export function isEmailAllowed(email: string) {
  const allow = getAllowlistedEmail();
  if (!allow) return false;
  return email.trim().toLowerCase() === allow;
}

export function randomSessionId() {
  return crypto.randomUUID();
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export function randomToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function getCookieFromHeader(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((p) => p.trim());
  for (const p of parts) {
    const idx = p.indexOf("=");
    if (idx === -1) continue;
    const k = p.slice(0, idx);
    if (k !== name) continue;
    return decodeURIComponent(p.slice(idx + 1));
  }
  return null;
}
