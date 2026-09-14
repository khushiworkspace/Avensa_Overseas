import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
