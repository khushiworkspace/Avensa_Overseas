import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Avensa Overseas – EU Immigration Portal",
    template: "%s | Avensa Overseas",
  },
  description:
    "Check your eligibility, prepare documents and track your EU immigration application with Avensa Overseas – your trusted immigration guidance platform.",
  keywords: [
    "EU immigration",
    "visa application",
    "Germany work visa",
    "EU Blue Card",
    "Schengen visa",
    "immigration eligibility",
    "Avensa Overseas",
  ],
  openGraph: {
    title: "Avensa Overseas – EU Immigration Portal",
    description: "Your trusted EU immigration guidance and application management platform.",
    type: "website",
    locale: "en_GB",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
