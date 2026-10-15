"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, MonitorPlay, NotebookPen } from "lucide-react";
import { BRAND, DEMO_PATH, SLIDES, fmt, TOTAL_SECONDS } from "./content";
import { rememberReturn, useSlide } from "./deckState";
import {
  ArchitectureSlide, ClosingSlide, DemoSlide, ExperienceSlide, IntroSlide, JourneySlide, LessonsSlide, ProblemSlide, WorkSlide,
  type SlideProps,
} from "./Slides";

const VIEWS: ((p: SlideProps) => ReactNode)[] = [
  IntroSlide, ProblemSlide, ExperienceSlide, JourneySlide, ArchitectureSlide, DemoSlide, LessonsSlide, WorkSlide, ClosingSlide,
];

export function Deck() {
  const { index, go } = useSlide();
  const reduce = useReducedMotion();
  const [full, setFull] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  const goTo = go;
  const launchDemo = useCallback(() => {
    rememberReturn(index);
    window.location.assign(DEMO_PATH);
  }, [index]);

  const toggleFull = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);
  const openPresenter = useCallback(() => {
    window.open(`/ai-guild/presenter#${index + 1}`, "ai-guild-presenter", "popup,width=1100,height=760");
  }, [index]);

  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const inControl = e.target instanceof Element && e.target.closest("button, a, input, textarea, select");
      switch (e.key) {
        case "ArrowRight": case "PageDown": goTo(index + 1); break;
        case "ArrowLeft": case "PageUp": goTo(index - 1); break;
        case " ": if (inControl) return; goTo(index + 1); break;
        case "Home": goTo(0); break;
        case "End": goTo(SLIDES.length - 1); break;
        case "f": case "F": toggleFull(); break;
        case "p": case "P": openPresenter(); break;
        default:
          if (/^[1-9]$/.test(e.key)) goTo(parseInt(e.key, 10) - 1);
          else return;
      }
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index, toggleFull, openPresenter]);

  useEffect(() => { scroller.current?.scrollTo({ top: 0 }); }, [index]);

  const View = VIEWS[index];
  const slide = SLIDES[index];
  const iconBtn = "inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-xs font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white";

  return (
    <div className="fixed inset-0 flex flex-col bg-navy-950 text-white" role="region" aria-roledescription="presentation" aria-label="AI Guild presentation">
      <div className="hex-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <header className="relative z-10 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 md:px-8">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg font-semibold">{BRAND}</span>
          <span className="eyebrow hidden text-white/50 sm:inline">AI Guild · {index + 1} / {SLIDES.length} · {slide.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openPresenter} className={iconBtn} title="Presenter view (P)"><NotebookPen className="size-4" aria-hidden="true" /><span className="hidden md:inline">Presenter view</span></button>
          <button onClick={toggleFull} className={iconBtn} title="Full screen (F)">
            {full ? <Minimize2 className="size-4" aria-hidden="true" /> : <Maximize2 className="size-4" aria-hidden="true" />}
            <span className="hidden md:inline">{full ? "Exit full screen" : "Full screen"}</span>
          </button>
        </div>
      </header>

      <div ref={scroller} className="relative z-10 min-h-0 flex-1 overflow-y-auto" id="slide-area">
          <motion.div
            key={slide.id} className="min-h-full"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <View go={goTo} launchDemo={launchDemo} active />
          </motion.div>
      </div>

      <footer className="relative z-10 shrink-0 border-t border-white/10 bg-navy-950/80 px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <button onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous slide" className={`${iconBtn} disabled:opacity-30`}><ChevronLeft className="size-4" aria-hidden="true" /></button>
          <nav aria-label="Slide progress" className="flex flex-1 items-center gap-1.5">
            {SLIDES.map((s, i) => (
              <button key={s.id} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}: ${s.title}`} aria-current={i === index ? "step" : undefined} title={s.title}
                className={`h-2 flex-1 rounded-full transition-colors ${i === index ? "bg-signal" : i < index ? "bg-signal/40" : "bg-white/15 hover:bg-white/30"}`} />
            ))}
          </nav>
          <span className="hidden text-xs tabular-nums text-white/45 md:inline"><MonitorPlay className="mr-1 inline size-3.5" aria-hidden="true" />{fmt(TOTAL_SECONDS)} talk</span>
          <button onClick={() => goTo(index + 1)} disabled={index === SLIDES.length - 1} aria-label="Next slide" className={`${iconBtn} disabled:opacity-30`}><ChevronRight className="size-4" aria-hidden="true" /></button>
        </div>
        <p className="mt-2 hidden text-[11px] text-white/35 md:block">← → navigate · 1–9 jump · F full screen · P presenter view</p>
      </footer>
    </div>
  );
}
