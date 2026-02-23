import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Hero Section */}
        <Hero />

        {/* About Me Section */}
        <About />

        {/* Tech Stack Section */}
        <TechStack />
      </div>
    </main>
  );
}
