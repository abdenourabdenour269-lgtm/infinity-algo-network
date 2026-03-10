import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "InfinityAlgoPower - Professional Trading Tools | أدوات تداول احترافية",
  description: "Your trusted platform for professional trading tools. Advanced indicators, automated robots, and educational courses. | منصتك الموثوقة لأدوات التداول الاحترافية",
  keywords: ["Trading", "Crypto", "Forex", "AI Trading", "Signals", "Gold Trading", "Scalping", "تداول", "مؤشرات", "روبوتات"],
  authors: [{ name: "Infinity Algo Network" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "InfinityAlgoPower - Professional Trading Tools",
    description: "Your trusted platform for professional trading tools and education",
    type: "website",
    locale: "ar_SA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body 
        className="antialiased bg-background text-foreground"
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
