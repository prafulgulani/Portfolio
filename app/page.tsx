import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import OpenSource from "./components/OpenSource";
import Experience from "./components/Experience";

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

        {/* Open Source Contributions Section */}
        <OpenSource />

        {/* Experience Section */}
        <Experience />
      </div>
    </main>
  );
}
