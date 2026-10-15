"use client";
import { useCallback, useEffect, useSyncExternalStore } from "react";
import { SLIDES } from "./content";

// Slide position lives in the URL hash (#1..#9) so refresh, back, and return-from-demo all just work.
// A BroadcastChannel keeps the audience deck and the presenter window in step.
const CHANNEL = "ai-guild-deck";
const clamp = (n: number) => Math.min(SLIDES.length - 1, Math.max(0, n));
const parse = (h: string) => {
  const n = parseInt(h.replace("#", ""), 10);
  return Number.isFinite(n) ? clamp(n - 1) : 0;
};

const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

let tx: BroadcastChannel | null = null;
const sender = () => (tx ??= typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel(CHANNEL));

function writeHash(i: number) {
  window.history.replaceState(null, "", `${window.location.pathname}#${i + 1}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function useSlide() {
  const index = useSyncExternalStore(subscribe, () => parse(window.location.hash), () => 0);

  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;
    const ch = new BroadcastChannel(CHANNEL);
    ch.onmessage = (e) => {
      if (typeof e.data?.index === "number") writeHash(clamp(e.data.index));
    };
    return () => ch.close();
  }, []);

  const go = useCallback((i: number) => {
    const n = clamp(i);
    writeHash(n);
    sender()?.postMessage({ index: n });
  }, []);

  return { index, go };
}

// Demo hand-off: remember which slide to return to.
export const RETURN_KEY = "ai-guild:return-slide";
export function rememberReturn(i: number) {
  try {
    sessionStorage.setItem(RETURN_KEY, String(i + 1));
  } catch {
    /* storage unavailable: the return bar simply does not appear */
  }
}
