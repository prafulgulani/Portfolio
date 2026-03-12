"use client";
import Link from "next/link";
import ThemeModal from "./ThemeModal";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-md border-b border-on-accent/5">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-3xl font-bold text-accent transition-all duration-150 hover:-translate-y-1 hover:scale-105"
        >
          Praful
        </Link>

        {/* Navigation Links */}
        <div className="text-xs hidden uppercase font-sans font-extrabold md:flex items-center gap-10">
          <Link
            href="#about"
            className="hover:text-accent"
          >
            About
          </Link>
          <Link
            href="#contributions"
            className="hover:text-accent"
          >
            Open Source
          </Link>
          <Link
            href="#experience"
            className="hover:text-accent"
          >
            Experience
          </Link>
          <Link
            href="#projects"
            className="hover:text-accent"
          >
            Projects
          </Link>
          <Link
            href="/resume/resume.pdf"
            target="_blank"
            className="hover:text-accent"
          >
            Resume
          </Link>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-4">
          <ThemeModal />
        </div>
      </nav>
    </header>
  );
}
