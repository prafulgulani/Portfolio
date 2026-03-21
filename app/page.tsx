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
        <section id="about">
          <About />
        </section>

        {/* Open Source Contributions Section */}
        <section id="contributions">
          <OpenSource />
        </section>

        {/* Experience Section */}
        <section id="experience">
          <Experience />
        </section>

        {/* Tech Stack Section */}
        {/* <TechStack />  */}
      </div>
    </main>
  );
}
