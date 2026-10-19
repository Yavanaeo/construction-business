import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "LineHouse · Konstruksi & Renovasi",
  description: "Membangun dan merenovasi rumah dengan perencanaan yang jelas, pengerjaan yang terarah, dan perhatian pada detail. LineHouse melayani Jawa Barat, Indonesia.",
  metadataBase: new URL("https://linehouse.id"),
  openGraph: {
    title: "LineHouse · Konstruksi & Renovasi",
    description: "Membangun dan merenovasi rumah dengan perencanaan yang jelas, pengerjaan yang terarah, dan perhatian pada detail.",
    type: "website",
    locale: "id_ID",
    siteName: "LineHouse",
  },
  twitter: {
    card: "summary_large_image",
    title: "LineHouse · Konstruksi & Renovasi",
    description: "Membangun dan merenovasi rumah dengan perencanaan yang jelas, pengerjaan yang terarah, dan perhatian pada detail.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E8E4DC" },
    { media: "(prefers-color-scheme: dark)", color: "#171916" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        {children}
      </body>
    </html>
  );
}