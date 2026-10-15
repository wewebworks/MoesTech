import { Cctv, KeyRound, Server, Network, Speaker, Zap, type LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = {
  cctv: Cctv,
  key: KeyRound,
  server: Server,
  network: Network,
  speaker: Speaker,
  zap: Zap,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Zap;
  return <Icon className={className} aria-hidden="true" strokeWidth={1.6} />;
}
