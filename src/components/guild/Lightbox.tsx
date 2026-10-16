"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type Shot = { src: string; alt: string; caption: string };

// Full-size image viewer. Captures keys while open so the deck does not change slides underneath.
export function Lightbox({ shots, index, onChange, onClose }: { shots: Shot[]; index: number; onChange: (i: number) => void; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const shot = shots[index];

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onChange((index + 1) % shots.length);
      else if (e.key === "ArrowLeft") onChange((index - 1 + shots.length) % shots.length);
      else if (e.key === "Tab") { e.preventDefault(); closeRef.current?.focus(); }
      else if (/^[a-zA-Z0-9 .,]$|^Page|^Home$|^End$/.test(e.key)) { /* swallow deck shortcuts */ }
      else return;
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [index, shots.length, onChange, onClose]);

  if (typeof document === "undefined") return null;
  const nav = "absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-navy-950/80 text-white hover:bg-navy-900";
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`Screenshot: ${shot.caption}`} className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4" onClick={onClose}>
      <figure className="flex max-h-full max-w-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shot.src} alt={shot.alt} className="max-h-[88vh] max-w-[90vw] rounded-2xl border border-white/20 object-contain" />
        <figcaption className="mt-2 text-sm text-white/80">{shot.caption} · {index + 1} / {shots.length} · arrows to switch, Esc to close</figcaption>
      </figure>
      <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/30 bg-navy-950/80 text-white hover:bg-navy-900"><X className="size-5" aria-hidden="true" /></button>
      {shots.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); onChange((index - 1 + shots.length) % shots.length); }} aria-label="Previous screenshot" className={`${nav} left-4`}><ChevronLeft className="size-6" aria-hidden="true" /></button>
          <button onClick={(e) => { e.stopPropagation(); onChange((index + 1) % shots.length); }} aria-label="Next screenshot" className={`${nav} right-4`}><ChevronRight className="size-6" aria-hidden="true" /></button>
        </>
      )}
    </div>,
    document.body,
  );
}
