"use client";

import { useState } from "react";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
  NavbarButton,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { TapaLogo } from "@/components/tapa-logo";
import { SITE } from "@/lib/site";

const LOGO_TONE = "text-white transition-colors group-data-[visible=true]/nav:text-stone-950";

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <Navbar className="fixed top-0 pt-4">
      <NavBody>
        <TapaLogo className={LOGO_TONE} />
        <NavItems items={SITE.nav} />
        <div className="relative z-20 flex items-center gap-2">
          <NavbarButton href="#how-it-works" variant="secondary">
            See how it works
          </NavbarButton>
          <NavbarButton href={SITE.contactHref}>Talk to us</NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <TapaLogo className={LOGO_TONE} />
          <MobileNavToggle isOpen={menuOpen} onClick={() => setMenuOpen((open) => !open)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={menuOpen}>
          {SITE.nav.map((item) => (
            <a key={item.link} href={item.link} onClick={closeMenu} className="w-full py-1 text-lg text-stone-700">
              {item.name}
            </a>
          ))}
          <NavbarButton href={SITE.contactHref} onClick={closeMenu} className="mt-2 w-full py-3">
            Talk to us
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
