import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "dark" | "outline" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-signal text-navy-950 hover:bg-white",
  ghost: "border border-white/25 text-white hover:border-white hover:bg-white/10",
  dark: "bg-navy-900 text-white hover:bg-brand",
  light: "bg-white text-navy-900 hover:bg-navy-950 hover:text-white",
  outline: "border border-navy-900/20 text-navy-900 hover:border-brand hover:text-brand",
};

export function Button({
  href, children, variant = "primary", arrow = true, className = "",
}: { href: string; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
    </Link>
  );
}
