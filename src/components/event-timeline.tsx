"use client";

import type { LucideIcon } from "lucide-react";
import { LockKeyhole, ScanLine, Store, Undo2, Wallet } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";

type Step = { icon: LucideIcon; label: string };

function Phase({ who, body, steps }: { who: string; body: string; steps: Step[] }) {
  return (
    <div className="max-w-xl">
      <p className="text-xs font-medium tracking-wide text-brand-700 uppercase">{who}</p>
      <p className="mt-3 text-lg leading-relaxed text-stone-700">{body}</p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {steps.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white px-4 py-3 text-sm text-stone-700">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Icon className="size-4" />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

const PHASES = [
  {
    title: "Before",
    content: (
      <Phase
        who="Organiser"
        body="Create the event, add your stands and register a terminal for each one by scanning its setup code. Import the guest list and the bands."
        steps={[
          { icon: Store, label: "Stands, prices and caps" },
          { icon: ScanLine, label: "Terminals set up by QR" },
        ]}
      />
    ),
  },
  {
    title: "Doors",
    content: (
      <Phase
        who="Gate staff"
        body="Scan the ticket and link a band. From that moment the guest's wallet is locked to the event, which is what makes a green Paid on the terminal a promise."
        steps={[
          { icon: ScanLine, label: "Ticket scan, band linked" },
          { icon: LockKeyhole, label: "Re-entry is a single tap" },
        ]}
      />
    ),
  },
  {
    title: "All night",
    content: (
      <Phase
        who="Cashiers and help desk"
        body="Cashiers key the amount and guests tap. A mistake is reversed on the terminal; anything later goes to the help desk, with a reason and a name on the record."
        steps={[
          { icon: Wallet, label: "Swept to stands every 10 min" },
          { icon: Undo2, label: "Reversals with an audit trail" },
        ]}
      />
    ),
  },
  {
    title: "Close",
    content: (
      <Phase
        who="Organiser"
        body="Close checks every stand's numbers against what actually moved, takes the fees, and gives you a statement. Stands keep their takings; guests keep what they did not spend."
        steps={[
          { icon: Store, label: "Statement per stand" },
          { icon: Wallet, label: "Unspent money stays with guests" },
        ]}
      />
    ),
  },
];

export function EventTimeline() {
  return (
    <section id="how-it-works" className="mt-24 bg-stone-50/70 lg:mt-32">
      <Timeline
        data={PHASES}
        heading={
          <div className="max-w-2xl">
            <h2 className="text-4xl leading-[1.08] font-medium tracking-[-0.03em] text-balance sm:text-5xl">
              An event, from setup to the last round
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-500 sm:text-lg">
              Four moments, four kinds of people. Each one gets a screen built for exactly what they do.
            </p>
          </div>
        }
      />
    </section>
  );
}
