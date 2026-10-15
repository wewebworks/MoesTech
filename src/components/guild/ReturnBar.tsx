"use client";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RETURN_KEY } from "./deckState";

const read = () => {
  try { return sessionStorage.getItem(RETURN_KEY); } catch { return null; }
};
const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

// Shown on the portal only when the visitor arrived from the presentation deck.
export function ReturnBar() {
  const slide = useSyncExternalStore(subscribe, read, () => null);
  if (!slide) return null;
  return (
    <>
    <div className="h-16" aria-hidden="true" />
    <div className="fixed inset-x-0 bottom-0 z-[60] flex items-center justify-between gap-4 border-t border-signal/40 bg-navy-950/95 px-4 py-3 backdrop-blur md:px-8" role="region" aria-label="Presentation controls">
      <p className="eyebrow hidden text-white/60 sm:block">AI Guild demo in progress · sample data</p>
      <Link href={`/ai-guild#${slide}`} className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-white">
        <ArrowLeft className="size-4" aria-hidden="true" /> Return to Presentation
      </Link>
    </div>
    </>
  );
}
