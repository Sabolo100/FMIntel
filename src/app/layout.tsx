import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FM Intel | Piaci Intelligencia",
  description:
    "Magyar FM/PM/AM piaci intelligencia platform. Facility management, property management és asset management adatok, elemzések és piaci trendek.",
  keywords: [
    "facility management",
    "property management",
    "asset management",
    "irodapiac",
    "Budapest",
  ],
  openGraph: {
    title: "FM Intel | Piaci Intelligencia",
    description:
      "Magyar FM/PM/AM piaci intelligencia platform. Facility management, property management és asset management adatok, elemzések és piaci trendek.",
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
