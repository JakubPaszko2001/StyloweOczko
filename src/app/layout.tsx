import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const cormorant = Cormorant_Garamond({

  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stylowe Oczko – Salon Kosmetyczny Białystok | Rzęsy, Brwi, Manicure",
  description: "Salon kosmetyczny Stylowe Oczko w Białystoku. Stylizacja rzęs i brwi, manicure hybrydowy, pedicure, zabiegi kosmetologiczne, endermologia. Umów wizytę online.",
  keywords: "salon kosmetyczny Białystok, stylizacja rzęs Białystok, manicure hybrydowy Białystok, laminacja brwi, endermologia, Stylowe Oczko, Słonimska Białystok",
  authors: [{ name: "Stylowe Oczko" }, { name: "Fraymweb", url: "https://fraymweb.pl" }],
  creator: "Fraymweb",
  metadataBase: new URL("https://styloweoczko.pl"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://styloweoczko.pl",
    siteName: "Stylowe Oczko",
    title: "Stylowe Oczko – Salon Kosmetyczny Białystok",
    description: "Salon kosmetyczny w Białystoku. Stylizacja rzęs i brwi, manicure, zabiegi kosmetologiczne. Umów wizytę przez Booksy.",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon.ico",
  },
  manifest: "/favicon/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${cormorant.variable} ${jost.variable} font-sans antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
