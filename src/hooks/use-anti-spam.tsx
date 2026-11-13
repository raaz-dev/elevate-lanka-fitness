import { useCallback, useMemo, useRef, useState } from "react";

/**
 * Client-side anti-spam guard for public forms.
 * Layers: honeypot field, minimum fill time, per-form submit throttle
 * (sliding window persisted in localStorage) and an arithmetic bot check.
 * These are deterrents — they run in the browser, so they should be paired
 * with server-side verification once submissions hit a backend.
 */

const WINDOW_MS = 60_000;
const MAX_IN_WINDOW = 3;
const MIN_FILL_MS = 3_000;
const COOLDOWN_MS = 30_000;

function storageKey(formId: string) {
  return `ironpeak.antispam.${formId}`;
}

function readHistory(formId: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey(formId));
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    if (!Array.isArray(parsed)) return [];
    const now = Date.now();
    return parsed.filter((n): n is number => typeof n === "number" && now - n < WINDOW_MS);
  } catch {
    return [];
  }
}

function writeHistory(formId: string, stamps: number[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(formId), JSON.stringify(stamps));
  } catch {
    /* storage unavailable — throttle degrades to in-memory only */
  }
}

export type AntiSpamResult =
  | { ok: true }
  | { ok: false; reason: "bot" | "tooFast" | "throttled" | "captcha"; retryInSeconds: number };

export function useAntiSpam(formId: string) {
  const mountedAt = useRef(Date.now());
  const [honeypot, setHoneypot] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [nonce, setNonce] = useState(0);

  const challenge = useMemo(() => {
    // Deterministic per attempt, regenerated after each submit via `nonce`.
    const a = 2 + Math.floor(Math.random() * 8);
    const b = 1 + Math.floor(Math.random() * 8);
    return { a, b, sum: a + b };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce]);

  const reset = useCallback(() => {
    mountedAt.current = Date.now();
    setCaptchaAnswer("");
    setNonce((n) => n + 1);
  }, []);

  const verify = useCallback((): AntiSpamResult => {
    if (honeypot.trim().length > 0) {
      return { ok: false, reason: "bot", retryInSeconds: 0 };
    }

    const elapsed = Date.now() - mountedAt.current;
    if (elapsed < MIN_FILL_MS) {
      return { ok: false, reason: "tooFast", retryInSeconds: Math.ceil((MIN_FILL_MS - elapsed) / 1000) };
    }

    if (Number(captchaAnswer.trim()) !== challenge.sum) {
      return { ok: false, reason: "captcha", retryInSeconds: 0 };
    }

    const history = readHistory(formId);
    if (history.length >= MAX_IN_WINDOW) {
      const oldest = Math.min(...history);
      const wait = Math.max(1, Math.ceil((oldest + WINDOW_MS - Date.now()) / 1000));
      return { ok: false, reason: "throttled", retryInSeconds: wait };
    }

    const last = history.length > 0 ? Math.max(...history) : 0;
    if (last && Date.now() - last < COOLDOWN_MS) {
      const wait = Math.ceil((last + COOLDOWN_MS - Date.now()) / 1000);
      return { ok: false, reason: "throttled", retryInSeconds: wait };
    }

    writeHistory(formId, [...history, Date.now()]);
    return { ok: true };
  }, [captchaAnswer, challenge.sum, formId, honeypot]);

  return {
    challenge,
    captchaAnswer,
    setCaptchaAnswer,
    honeypot,
    setHoneypot,
    verify,
    reset,
  };
}
