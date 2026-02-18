'use client';
import Link from 'next/link';
import ThemeModal from './ThemeModal';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[--bg-color]/80 backdrop-blur-md border-b border-[--accent-soft]/10">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold tracking-tighter text-[--accent-color]">
          PG.
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-sm font-medium hover:text-[--accent-color] transition-colors">
            About
          </Link>
          <Link href="/projects" className="text-sm font-medium hover:text-[--accent-color] transition-colors">
            Projects
          </Link>
          <Link href="/resume.pdf" target="_blank" className="text-sm font-medium hover:text-[--accent-color] transition-colors">
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