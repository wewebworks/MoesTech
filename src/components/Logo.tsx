// Text wordmark: no image assets, no third-party branding.
export function Logo({ variant = "white", className = "" }: { variant?: "white" | "color"; className?: string }) {
  const base = variant === "white" ? "text-white" : "text-navy-900";
  return (
    <span className={`font-display text-2xl font-semibold tracking-tight ${base} ${className.replace(/\bh-\d+\b|\bw-auto\b/g, "")}`} aria-label="MoeTech">
      Moe<span className="text-signal">Tech</span>
    </span>
  );
}
