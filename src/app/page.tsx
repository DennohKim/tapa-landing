import { ClosingCta } from "@/components/closing-cta";
import { EventTimeline } from "@/components/event-timeline";
import { Faq } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Platform } from "@/components/platform";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Platform />
        <Features />
        <EventTimeline />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
