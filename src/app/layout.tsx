import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Onjaro | Magyar Kerékpársport Portál",
  description:
    "Magyar kerékpársport-portál 45-60 éves férfiak számára. Edzéstervek, felszerelés-tanácsok, tippek országúti kerékpározáshoz, MTB-hez és ciklokrosszhoz.",
  keywords: [
    "kerékpározás",
    "MTB",
    "mountain bike",
    "ciklokrossz",
    "országúti kerékpározás",
    "edzésterv",
    "kerékpár felszerelés",
  ],
  openGraph: {
    title: "Onjaro | Magyar Kerékpársport Portál",
    description:
      "Magyar kerékpársport-portál 45-60 éves férfiak számára. Edzéstervek, felszerelés-tanácsok és közösségi élmény.",
    locale: "hu_HU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className="antialiased">{children}</body>
    </html>
  );
}
