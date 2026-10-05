import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Tapa · Tap to pay at events", template: "%s · Tapa" },
  description: SITE.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
