import { Nfc } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";

function Stage({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative -mx-7 -mb-7 flex flex-1 items-end justify-center overflow-hidden bg-gradient-to-b from-white to-stone-50 px-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

function TerminalVisual() {
  return (
    <Stage>
      <div className="w-48 translate-y-6 rounded-t-[2rem] bg-stone-900 p-2.5 pb-0 shadow-[0_30px_60px_-20px_rgba(28,25,23,0.45)] transition duration-500 group-hover/bento:translate-y-3">
        <div className="rounded-t-[1.5rem] bg-white px-4 pt-5 pb-10 text-center">
          <p className="text-[11px] font-medium tracking-wide text-stone-400 uppercase">Kilele Bar</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">KES 650</p>
          <div className="relative mx-auto mt-5 grid size-16 place-items-center">
            <span className="absolute inset-0 animate-tap-ring rounded-full border-2 border-brand-300 motion-reduce:hidden" />
            <span className="grid size-12 place-items-center rounded-full bg-brand-50 text-brand-600">
              <Nfc className="size-6" />
            </span>
          </div>
          <p className="mt-3 text-xs text-stone-500">Hold band to the reader</p>
        </div>
      </div>
    </Stage>
  );
}

const QUEUE = [
  { amount: "KES 400", time: "22:14", status: "Saved, will send", tone: "bg-amber-50 text-amber-700" },
  { amount: "KES 1,200", time: "22:12", status: "Saved, will send", tone: "bg-amber-50 text-amber-700" },
  { amount: "KES 650", time: "22:09", status: "Sent", tone: "bg-emerald-50 text-emerald-700" },
];

function OfflineVisual() {
  return (
    <Stage className="items-center">
      <ul className="w-full max-w-64 space-y-2">
        {QUEUE.map((sale, index) => (
          <li
            key={sale.time}
            style={{ transitionDelay: `${index * 60}ms` }}
            className="flex items-center justify-between rounded-2xl border border-stone-200/80 bg-white px-4 py-3 shadow-sm transition duration-300 group-hover/bento:-translate-y-0.5"
          >
            <div>
              <p className="text-sm font-medium tabular-nums">{sale.amount}</p>
              <p className="text-xs text-stone-400 tabular-nums">{sale.time}</p>
            </div>
            <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium", sale.tone)}>{sale.status}</span>
          </li>
        ))}
      </ul>
    </Stage>
  );
}

const SWEEPS = [
  { time: "22:20", amount: "+ KES 6,400" },
  { time: "22:10", amount: "+ KES 5,150" },
  { time: "22:00", amount: "+ KES 7,900" },
];

function WalletVisual() {
  return (
    <Stage>
      <div className="w-56 translate-y-6 rounded-t-[2.25rem] border-[6px] border-b-0 border-stone-900 bg-white px-4 pt-6 pb-8 shadow-[0_30px_60px_-20px_rgba(28,25,23,0.35)] transition duration-500 group-hover/bento:translate-y-3">
        <div className="mx-auto -mt-3 mb-4 h-4 w-16 rounded-full bg-stone-900" />
        <p className="text-[11px] font-medium tracking-wide text-stone-400 uppercase">Kilele Bar wallet</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">KES 48,250</p>
        <ul className="mt-4 space-y-2 border-t border-stone-100 pt-3">
          {SWEEPS.map((sweep) => (
            <li key={sweep.time} className="flex justify-between text-xs tabular-nums">
              <span className="text-stone-400">Sweep {sweep.time}</span>
              <span className="font-medium text-emerald-600">{sweep.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  );
}

const STANDS = [
  { name: "Kilele Bar", amount: "KES 184,300", share: 92 },
  { name: "Nyama Choma Grill", amount: "KES 151,900", share: 76 },
  { name: "Main Stage Bar", amount: "KES 128,450", share: 64 },
  { name: "Merch Tent", amount: "KES 46,200", share: 23 },
];

function DashboardVisual() {
  return (
    <Stage className="items-center">
      <div className="w-full max-w-xl rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-medium">Sales by stand</p>
          <p className="flex items-center gap-1.5 text-xs text-emerald-600">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
            Live
          </p>
        </div>
        <ul className="mt-4 space-y-3">
          {STANDS.map((stand) => (
            <li key={stand.name} className="grid grid-cols-[8rem_1fr_auto] items-center gap-3 text-xs sm:grid-cols-[10rem_1fr_auto]">
              <span className="truncate text-stone-500">{stand.name}</span>
              <span className="h-2 overflow-hidden rounded-full bg-stone-100">
                <span
                  style={{ width: `${stand.share}%` }}
                  className="block h-full origin-left rounded-full bg-brand-500 transition duration-700 group-hover/bento:bg-brand-600"
                />
              </span>
              <span className="font-medium tabular-nums">{stand.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  );
}

function BalanceVisual() {
  return (
    <Stage className="items-center">
      <div className="flex w-full max-w-64 items-center gap-4 rounded-2xl bg-brand-600 p-5 text-white shadow-[0_24px_50px_-24px_rgba(204,69,40,0.7)] transition duration-300 group-hover/bento:-rotate-1">
        <span className="h-14 w-4 shrink-0 rounded-full bg-white/25 ring-1 ring-white/40" />
        <div>
          <p className="text-xs text-white/75">Left after the event</p>
          <p className="text-2xl font-semibold tracking-tight tabular-nums">KES 1,350</p>
          <p className="mt-1 text-xs text-white/75">Still in the guest&apos;s wallet</p>
        </div>
      </div>
    </Stage>
  );
}

const FEATURES = [
  {
    title: "A sale takes about a second",
    description: "The cashier keys the amount, the guest taps. No phone, no PIN, no waiting on an M-Pesa prompt.",
    header: <TerminalVisual />,
  },
  {
    title: "Keeps selling when the signal drops",
    description: "Terminals queue sales up to an offline allowance you set and send them the moment they reconnect.",
    header: <OfflineVisual />,
  },
  {
    title: "Stands get paid during the night",
    description: "Every ten minutes, held money moves to each stand's own wallet. No float, no waiting days.",
    header: <WalletVisual />,
  },
  {
    title: "Watch every stand, live",
    description:
      "The organiser console shows sales as they happen, freezes a lost band, and handles late reversals with a reason on record.",
    header: <DashboardVisual />,
    className: "md:col-span-2",
  },
  {
    title: "Nothing to refund at the end",
    description: "Unspent money never left the guest's wallet, so there is no refund queue when the lights come up.",
    header: <BalanceVisual />,
  },
];

export function Features() {
  return (
    <section className="px-4 pt-4 sm:px-6">
      <BentoGrid className="max-w-6xl">
        {FEATURES.map((feature) => (
          <BentoGridItem key={feature.title} {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
}
