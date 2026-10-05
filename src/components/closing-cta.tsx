import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="px-4 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-stone-950 px-7 py-16 text-white sm:px-14 sm:py-20">
        <div
          aria-hidden
          className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_65%)]"
        />
        <div aria-hidden className="absolute -top-40 -right-24 size-[28rem] rounded-full bg-brand-600/45 blur-3xl" />
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl leading-[1.05] font-medium tracking-[-0.03em] sm:text-5xl">
              Running an event this season?
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
              Tell us the date, the venue and how many stands. We&apos;ll set you up with bands, terminals and the
              organiser console.
            </p>
          </div>
          <a
            href={SITE.contactHref}
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-white py-1.5 pr-1.5 pl-6 text-[15px] font-medium text-stone-950 transition hover:bg-brand-50"
          >
            Talk to us
            <span className="grid size-9 place-items-center rounded-full bg-brand-600 text-white transition group-hover:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
