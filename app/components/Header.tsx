"use client";
import Link from "next/link";
import ThemeModal from "./ThemeModal";

export default function Header() {
  return (
    /* 1. bg-surface handles the background, backdrop-blur-md adds the blur effect */
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* 2. Brand: Highlighted with text-accent */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-accent hover:opacity-80 transition-opacity"
        >
          PG
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {/* 3. Using text-text-main for high contrast and hover:text-accent for the pop */}
          <Link
            href="/about"
            className="text-sm font-medium text-text-main hover:text-accent transition-colors"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-text-main hover:text-accent transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/resume.pdf"
            target="_blank"
            className="text-sm font-medium text-text-main hover:text-accent transition-colors"
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
