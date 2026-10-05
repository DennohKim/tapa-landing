import type { ReactNode } from "react";
import { Check, Nfc, WifiOff } from "lucide-react";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { TapaMark } from "@/components/tapa-logo";
import { cn } from "@/lib/utils";

type TileTone = "solid" | "glass" | "ghost";

function Tile({ tone, children }: { tone: TileTone; children?: ReactNode }) {
  return (
    <div
      className={cn(
        "flex size-full flex-col items-center justify-center gap-3 rounded-[2rem] text-center",
        tone === "solid" && "bg-white text-stone-950 shadow-[0_30px_60px_-30px_rgba(42,15,8,0.55)]",
        tone === "glass" && "bg-white/15 text-white ring-1 ring-white/25",
        tone === "ghost" && "border-2 border-dashed border-white/35",
      )}
    >
      {children}
    </div>
  );
}

const WORD = "text-6xl font-semibold tracking-tight";
const CAPTION = "text-2xl opacity-60";

const TILES = [
  <Tile key="mpesa" tone="solid">
    <span className={WORD}>M-PESA</span>
    <span className={CAPTION}>Top up</span>
  </Tile>,
  <Tile key="ghost-1" tone="ghost" />,
  <Tile key="kes" tone="glass">
    <span className={cn(WORD, "tabular-nums")}>KES 650</span>
    <span className={CAPTION}>Kilele Bar</span>
  </Tile>,
  <Tile key="tapa" tone="solid">
    <TapaMark className="size-24" />
    <span className="text-5xl font-semibold tracking-tight">tapa</span>
  </Tile>,
  <Tile key="nfc" tone="glass">
    <Nfc className="size-28" strokeWidth={1.5} />
  </Tile>,
  <Tile key="usdc" tone="solid">
    <span className={WORD}>USDC</span>
    <span className={CAPTION}>on Base</span>
  </Tile>,
  <Tile key="ghost-2" tone="ghost" />,
  <Tile key="paid" tone="solid">
    <span className="grid size-24 place-items-center rounded-full bg-brand-600 text-white">
      <Check className="size-12" strokeWidth={3} />
    </span>
    <span className="text-4xl font-medium">Paid</span>
  </Tile>,
  <Tile key="offline" tone="glass">
    <WifiOff className="size-20" strokeWidth={1.5} />
    <span className="text-3xl">Saved, will send</span>
  </Tile>,
  <Tile key="sweep" tone="solid">
    <span className={WORD}>10 min</span>
    <span className={CAPTION}>to the stand&apos;s wallet</span>
  </Tile>,
  <Tile key="ghost-3" tone="ghost" />,
  <Tile key="gate" tone="glass">
    <span className={WORD}>Gate</span>
    <span className={CAPTION}>Band linked</span>
  </Tile>,
  <Tile key="kes-2" tone="solid">
    <span className={cn(WORD, "tabular-nums")}>KES 1,350</span>
    <span className={CAPTION}>Balance left</span>
  </Tile>,
  <Tile key="ghost-4" tone="ghost" />,
  <Tile key="base" tone="glass">
    <span className={WORD}>Base</span>
    <span className={CAPTION}>Settled on chain</span>
  </Tile>,
  <Tile key="tap" tone="solid">
    <Nfc className="size-20 text-brand-600" strokeWidth={1.5} />
    <span className="text-3xl font-medium">Hold band to reader</span>
  </Tile>,
  <Tile key="ghost-5" tone="ghost" />,
  <Tile key="freeze" tone="glass">
    <span className={WORD}>Frozen</span>
    <span className={CAPTION}>Lost band, balance safe</span>
  </Tile>,
  <Tile key="kes-3" tone="solid">
    <span className={cn(WORD, "tabular-nums")}>KES 2,600</span>
    <span className={CAPTION}>Per-tap cap</span>
  </Tile>,
  <Tile key="ghost-6" tone="ghost" />,
  <Tile key="reversed" tone="glass">
    <span className={WORD}>Reversed</span>
    <span className={CAPTION}>With a reason on record</span>
  </Tile>,
  <Tile key="statement" tone="solid">
    <span className={WORD}>Close</span>
    <span className={CAPTION}>Statement per stand</span>
  </Tile>,
  <Tile key="ghost-7" tone="ghost" />,
  <Tile key="kes-4" tone="solid">
    <span className={cn(WORD, "tabular-nums")}>KES 300</span>
    <span className={CAPTION}>Merch Tent</span>
  </Tile>,
];

export function Platform() {
  return (
    <section id="product" className="px-4 pt-24 sm:px-6 lg:pt-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl leading-[1.08] font-medium tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.5rem]">
          One band runs the gate, the bars and the payouts
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone-500 sm:text-lg">
          Every ticket gets its own wallet. Guests load it, wear the band that points at it, and tap to pay. Each
          stand&apos;s takings land in its own wallet while the night is still going.
        </p>
      </div>

      <div className="relative mx-auto mt-14 h-[34rem] max-w-6xl overflow-hidden rounded-[2rem] bg-brand-600 sm:h-[30rem]">
        <ThreeDMarquee
          tiles={TILES}
          className="absolute inset-0 h-full rounded-none max-sm:h-full"
          boardClassName="scale-[0.45] sm:scale-[0.5] lg:scale-[0.55]"
          gridClassName="top-[20rem] -right-[18rem] sm:top-[41.5rem]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-800 via-brand-700/70 via-45% to-transparent sm:bg-gradient-to-r sm:from-brand-800/85 sm:via-brand-700/45 sm:via-40% sm:to-transparent sm:to-70%"
        />
        <div className="absolute inset-x-0 bottom-0 max-w-md p-7 text-white sm:p-10">
          <h3 className="text-3xl leading-[1.1] font-medium tracking-tight sm:text-4xl">
            Load with M-Pesa.
            <br />
            Spend with a tap.
          </h3>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/90">
            Guests top up in shillings. Every tap is held on the spot and swept to the stand&apos;s wallet every ten
            minutes, settled as USDC on Base. Nobody at the bar ever sees a token.
          </p>
        </div>
      </div>
    </section>
  );
}
