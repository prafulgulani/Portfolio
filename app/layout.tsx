import Header from "./components/Header";
import ChatBot from "./components/ChatBot";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;700;900&family=Spectral:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="pt-16">
        {/* The Header stays at the top */}
        <Header />

        {/* The actual page content (from page.tsx) goes here */}
        <main>{children}</main>

        {/* The ChatBot stays floating at the bottom right */}
        <ChatBot />
      </body>
    </html>
  );
}
