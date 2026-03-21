import Header from "./components/Header";
import ChatBot from "./components/ChatBot";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollHandler from "./components/ScrollHandler";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;700;900&family=Spectral:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="pt-16">
        <Header />

        <ScrollHandler />
        <main>{children}</main>
        <Analytics />
        <SpeedInsights />

        <ChatBot />
      </body>
    </html>
  );
}
