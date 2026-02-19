import Header from './components/Header';
import ChatBot from './components/ChatBot';
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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