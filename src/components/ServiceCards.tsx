import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { coreServices } from "@/lib/site";
import { ServiceIcon } from "./ui/icons";
import { Reveal } from "./ui/Reveal";

export function ServiceCards() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {coreServices.map((s, i) => (
        <li key={s.title}>
          <Reveal delay={(i % 3) * 0.08} className="h-full">
            <Link
              href={s.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_50px_-24px_rgba(45,59,255,0.35)]"
            >
              <span className="grid size-12 place-items-center rounded-md bg-navy-950 text-signal transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                <ServiceIcon name={s.icon} className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-navy-900">{s.title}</h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-slate-ink">{s.text}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Learn more <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
