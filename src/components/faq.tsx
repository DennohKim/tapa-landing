import { Plus } from "lucide-react";

const QUESTIONS = [
  {
    q: "What if the venue has no signal?",
    a: "Terminals keep selling. Each one can take sales on trust up to an offline allowance you set, queues them, and sends them as soon as it reconnects. A sale can never be charged twice.",
  },
  {
    q: "What happens when a guest loses their band?",
    a: "The help desk freezes it from the console straight away and links a replacement. The balance lives in the guest's wallet, not on the band, so nothing is lost.",
  },
  {
    q: "Can a cashier undo a mistake?",
    a: "Yes, on the terminal, within the reversal window. After that the help desk reverses it from the console, and the audit log records who did it and why.",
  },
  {
    q: "How and when do stands get paid?",
    a: "Every ten minutes, held money moves from guests' wallets to each stand's own wallet. Fees are taken hourly and once more at close, so stands are not waiting days after the event.",
  },
  {
    q: "What happens to money a guest does not spend?",
    a: "It stays in their own wallet. There is no organiser float and no refund queue at the end of the night.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-4xl leading-[1.08] font-medium tracking-[-0.03em] sm:text-5xl">Questions organisers ask</h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-stone-500">
            The short version of how Tapa behaves when a real night gets messy.
          </p>
        </div>
        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {QUESTIONS.map(({ q, a }) => (
            <details key={q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {q}
                <Plus className="size-5 shrink-0 text-stone-400 transition duration-300 group-open:rotate-45 group-open:text-brand-600" />
              </summary>
              <p className="mt-3 max-w-xl leading-relaxed text-stone-500">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
