import crypto from "node:crypto";

const SESSION_COOKIE = "homehouse_admin";

function base64url(input: string | Buffer) {
  const raw = typeof input === "string" ? Buffer.from(input, "utf8") : Buffer.from(input);
  return raw.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64urlToBuffer(input: string) {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((input.length + 3) % 4);
  return Buffer.from(padded, "base64");
}

export function getAllowlistedEmail() {
  const raw = process.env.ADMIN_ALLOWLIST_EMAIL;
  return raw ? raw.trim().toLowerCase() : null;
}

export function isEmailAllowed(email: string) {
  const allow = getAllowlistedEmail();
  if (!allow) return false;
  return email.trim().toLowerCase() === allow;
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.length >= 16) return secret;
  if (process.env.NODE_ENV !== "production") return "dev-session-secret-dev-session-secret";
  return null;
}

function sign(data: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(data).digest();
}

export function createSession(email: string) {
  const secret = getSessionSecret();
  if (!secret) return null;

  const payload = {
    email: email.trim().toLowerCase(),
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };

  const body = base64url(JSON.stringify(payload));
  const sig = base64url(sign(body, secret));
  return `${body}.${sig}`;
}

export function verifySession(token: string | null) {
  const secret = getSessionSecret();
  if (!secret) return null;
  if (!token) return null;

  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expected = base64url(sign(body, secret));
  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null;

  try {
    const parsed = JSON.parse(base64urlToBuffer(body).toString("utf8"));
    if (!parsed || typeof parsed.email !== "string" || typeof parsed.exp !== "number") return null;
    if (Date.now() > parsed.exp) return null;
    return { email: parsed.email };
  } catch {
    return null;
  }
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
