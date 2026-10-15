import Image from "next/image";

export function Logo({ variant = "white", className = "h-10 w-auto" }: { variant?: "white" | "color"; className?: string }) {
  return (
    <Image
      src={variant === "white" ? "/brand/logo-white.png" : "/brand/logo-color.png"}
      alt="RNA Tek — Committed to Quality"
      width={1503}
      height={528}
      className={className}
      priority
    />
  );
}
