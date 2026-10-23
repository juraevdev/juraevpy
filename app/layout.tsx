import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Italianno, Newsreader } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/navigation/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* Signature only, always below the fold — not preloaded so it never competes with the hero. */
const italianno = Italianno({
  variable: "--font-italianno",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Python Backend Developer",
    "Django",
    "FastAPI",
    "AI automation",
    "backend systems",
    "business software",
    "Telegram bots",
    "Davlat Juraev",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f2e9",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${geistSans.variable} ${geistMono.variable} ${italianno.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          {children}
        </MotionProvider>
        <JsonLd />
      </body>
    </html>
  );
}
