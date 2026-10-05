import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { TapaLogo } from "@/components/tapa-logo";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="px-4 pt-16 pb-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="-mx-4 h-40 sm:h-64 lg:h-80">
          <TextHoverEffect text="tapa" />
        </div>
        <div className="flex flex-col gap-6 border-t border-stone-200 pt-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <TapaLogo className="text-lg text-stone-950" />
            <span>by Expendi</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {SITE.nav.map((item) => (
              <a key={item.link} href={item.link} className="transition hover:text-stone-950">
                {item.name}
              </a>
            ))}
            <a href={SITE.contactHref} className="transition hover:text-stone-950">
              Contact
            </a>
          </nav>
        </div>
        <p className="mt-6 text-xs text-stone-400">
          © {new Date().getFullYear()} Expendi. Hero photo by{" "}
          <a
            href="https://unsplash.com/photos/a-group-of-people-raising-their-hands-in-the-air-SvwmxHVO9ko"
            className="underline-offset-2 hover:underline"
          >
            Daniela Becerra on Unsplash
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
