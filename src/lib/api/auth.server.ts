import { createHash, timingSafeEqual } from "node:crypto";
import { getRequest } from "@tanstack/react-start/server";

const COOKIE_NAME = "elite_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "elite-dev-session-secret";
}

export function adminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "Admin",
    password: process.env.ADMIN_PASSWORD || "ErickAlpha@1",
  };
}

function signPayload(payload: string) {
  return createHash("sha256").update(`${payload}:${sessionSecret()}`).digest("hex");
}

export function createSessionCookieValue() {
  const payload = Buffer.from(JSON.stringify({ role: "admin", exp: Date.now() + SESSION_TTL_MS })).toString("base64url");
  return `${payload}.${signPayload(payload)}`;
}

export function verifySessionCookieValue(value: string | null | undefined) {
  if (!value) return false;
  const [payload, sig] = value.split(".");
  if (!payload || !sig) return false;
  const expected = signPayload(payload);
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp?: number };
    return typeof parsed.exp === "number" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export function sessionCookieHeader(value: string) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_MS / 1000}${secure}`;
}

export function clearSessionCookieHeader() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}

export function readSessionFromRequest() {
  const request = getRequest();
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export function requireAdminSession() {
  const token = readSessionFromRequest();
  if (!verifySessionCookieValue(token)) {
    throw new Error("Unauthorized");
  }
}
