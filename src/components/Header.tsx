"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, LogIn, Menu, Wrench, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  // Menu is tied to the path it was opened on, so navigating closes it without an effect.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (v: boolean) => setOpenPath(v ? pathname : null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const link = "text-sm font-medium text-white/80 transition-colors hover:text-white";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950/90 backdrop-blur-xl">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900">Skip to content</a>
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="MoeTech home"><Logo className="h-9 w-auto" /></Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.primary.map((n) => <Link key={n.href} href={n.href} className={link}>{n.label}</Link>)}
          <div className="group relative">
            <button className={`${link} inline-flex items-center gap-1`} aria-haspopup="true">
              Services <ChevronDown className="size-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" aria-hidden="true" />
            </button>
            <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="rounded-md border border-white/10 bg-navy-900 p-2 shadow-2xl">
                {nav.services.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="block rounded-md px-4 py-3 transition-colors hover:bg-white/5">
                      <span className="block text-sm font-semibold text-white">{s.label}</span>
                      <span className="block text-xs text-white/55">{s.blurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {nav.secondary.map((n) => <Link key={n.href} href={n.href} className={link}>{n.label}</Link>)}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/portal-preview" className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:text-white">
            <LogIn className="size-4" aria-hidden="true" /> Client Login
          </Link>
          <Link href="/portal-preview#request" className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-white">
            <Wrench className="size-4" aria-hidden="true" /> Request Service
          </Link>
        </div>

        <button
          className="grid size-11 place-items-center rounded-md border border-white/20 text-white lg:hidden"
          aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-navy-950 lg:hidden">
          <nav aria-label="Mobile" className="container-x flex flex-col py-6">
            {[...nav.primary, ...nav.services.map((s) => ({ href: s.href, label: s.label })), ...nav.secondary].map((n) => (
              <Link key={n.href} href={n.href} className="border-b border-white/10 py-4 font-display text-xl text-white">{n.label}</Link>
            ))}
            <div className="mt-8 grid gap-3">
              <Link href="/portal-preview#request" className="rounded-md bg-signal py-4 text-center font-semibold text-navy-950">Request Service</Link>
              <Link href="/portal-preview" className="rounded-md border border-white/25 py-4 text-center font-semibold text-white">Client Login</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
