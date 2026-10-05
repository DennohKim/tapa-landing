"use client";

import Image from "next/image";
import { ArrowRight, Check, Nfc } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { SITE } from "@/lib/site";
import heroPhoto from "@/assets/hero-festival.jpg";

const HEADLINE = ["Your ticket", "is now", "your wallet"];
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function PaymentPill() {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/15 p-3 ring-1 ring-white/35 backdrop-blur-xl">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/25">
        <Nfc className="size-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">Kilele Bar</p>
        <p className="truncate text-xs text-white/75">Tapped and paid</p>
      </div>
      <p className="text-lg font-medium tabular-nums">KES 650</p>
    </div>
  );
}

/** Frames the wristband in the photo; the hero keeps a 16:10 box on desktop so the percentages stay on it. */
function TapFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
      className="absolute top-[21%] left-[60.5%] hidden h-[62%] w-[23%] lg:block"
    >
      <CardContainer containerClassName="size-full py-0" className="size-full">
        <CardBody className="relative size-full rounded-[2rem] bg-gradient-to-b from-white/0 via-white/5 to-brand-500/45 ring-1 ring-white/60 backdrop-blur-[1.5px]">
          <span aria-hidden className="absolute top-[19%] left-[47%] -translate-1/2">
            <span className="absolute -inset-10 animate-tap-ring rounded-full border-2 border-white/70 motion-reduce:hidden" />
            <span className="absolute -inset-10 animate-tap-ring rounded-full border-2 border-white/50 [animation-delay:0.8s] motion-reduce:hidden" />
          </span>
          <CardItem translateZ={50} className="absolute top-4 right-4">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 18, delay: 1.2 }}
              className="grid size-9 place-items-center rounded-full bg-white text-brand-600 shadow-lg"
            >
              <Check className="size-4" strokeWidth={3} />
            </motion.span>
          </CardItem>
          <CardItem translateZ={70} className="absolute inset-x-3 bottom-3 w-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE_OUT }}
            >
              <PaymentPill />
            </motion.div>
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}

export function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-stone-900 text-white lg:aspect-[16/10] lg:min-h-0">
        <Image
          src={heroPhoto}
          alt="Festival crowd at sunset, one raised arm wearing an event wristband"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="-z-20 object-cover object-[78%_50%] lg:object-center"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-950/60 via-stone-950/20 to-transparent" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-stone-950/45 via-transparent to-stone-950/60" />

        <TapFrame />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-6 pt-32 pb-10 lg:h-full lg:min-h-0 lg:px-10 lg:pt-[12%] lg:pb-[5%]">
          <h1 className="text-[3.25rem] leading-[1.02] font-medium tracking-[-0.035em] sm:text-7xl lg:text-[5rem]">
            {HEADLINE.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + index * 0.09, ease: EASE_OUT }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE_OUT }}
            className="flex flex-col gap-6"
          >
            <div className="max-w-sm lg:hidden">
              <PaymentPill />
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
              <p className="max-w-xs text-[15px] leading-relaxed text-white/85">
                Guests load money onto an NFC wristband and tap to pay at every bar and stand. About a second
                per sale, even when the signal drops.
              </p>
              <a
                href={SITE.contactHref}
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-stone-950 py-1.5 pr-1.5 pl-6 text-[15px] font-medium text-white ring-1 ring-white/15 transition hover:bg-black"
              >
                Talk to us
                <span className="grid size-9 place-items-center rounded-full bg-brand-600 transition group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
