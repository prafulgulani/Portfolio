import Header from './components/Header';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pt-16"> {/* Added padding-top so content doesn't hide under the header */}
        <Header />
        {children}
      </body>
    </html>
  );
}