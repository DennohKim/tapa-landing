import { cn } from "@/lib/utils";

export function TapaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn("size-8", className)}>
      <rect width="64" height="64" rx="16" fill="var(--color-brand-600)" />
      <g fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="5">
        <path d="M24 22a14 14 0 0 1 0 20" />
        <path d="M33 16a22 22 0 0 1 0 32" />
      </g>
      <circle cx="17" cy="32" r="4" fill="#fff" />
    </svg>
  );
}

export function TapaLogo({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      className={cn("relative z-20 flex items-center gap-2.5 text-xl font-semibold tracking-tight", className)}
    >
      <TapaMark />
      <span>tapa</span>
    </a>
  );
}
