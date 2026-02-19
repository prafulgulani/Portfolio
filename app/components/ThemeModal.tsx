'use client';
import { useState, useEffect, useRef } from 'react';
import { THEMES, Theme } from '../constants/themes';

export default function ThemeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState('theme-bert-dark');
  const menuRef = useRef<HTMLDivElement>(null);

  const paintTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty('--bg-color', theme.bg);
    root.style.setProperty('--surface-color', theme.surface);
    root.style.setProperty('--text-main', theme.textMain);
    root.style.setProperty('--text-dim', theme.textDim);
    root.style.setProperty('--accent-color', theme.accent);
    root.style.setProperty('--on-accent', theme.onAccent);

    // 2. Dynamic Favicon Logic
    if (typeof window !== 'undefined') {
        // Look for existing icon, or create a new one
        let favicon = document.querySelector('link[rel~="icon"]') as HTMLLinkElement;
        
        if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
        }

        const svgCode = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="${theme.accent}" />
            <text x="16" y="21" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="${theme.bg}">
            PG
            </text>
        </svg>`.trim();

        // Use a timestamp to force the browser to ignore its cache
        const version = new Date().getTime();
        favicon.setAttribute('href', `data:image/svg+xml,${encodeURIComponent(svgCode)}#v=${version}`);
    }
  };

  const handleSelect = (theme: Theme) => {
    paintTheme(theme);
    setActiveThemeId(theme.id);
    localStorage.setItem('user-theme', theme.id);
    setIsOpen(false);
  };

  const handleHover = (theme: Theme) => {
    paintTheme(theme);
  };

  const handleMouseLeaveMenu = () => {
    const savedId = localStorage.getItem('user-theme') || 'theme-bert-dark';
    const savedTheme = THEMES.find(t => t.id === savedId) || THEMES[0];
    paintTheme(savedTheme);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const savedId = localStorage.getItem('user-theme') || 'theme-bert-dark';
    const savedTheme = THEMES.find(t => t.id === savedId) || THEMES[0];
    paintTheme(savedTheme);
    setActiveThemeId(savedId);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-lg border border-accent text-accent hover:bg-accent/10 transition-all font-medium"
      >
        Themes
      </button>

      {isOpen && (
        <div 
          onMouseLeave={handleMouseLeaveMenu}
          /* Updated bg-bg and border-accent/20 to match logic */
          className="absolute top-full right-0 mt-2 w-64 bg-bg border border-accent/20 rounded-xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="p-2 grid gap-1 max-h-80 overflow-y-auto">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onMouseEnter={() => handleHover(theme)}
                onClick={() => handleSelect(theme)}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  activeThemeId === theme.id 
                    ? 'bg-accent/10 border-l-4 border-accent' 
                    : 'hover:bg-accent/5'
                }`}
              >
                {/* 🚀 Changed text-tx-main to text-text-main */}
                <span className="text-sm font-semibold text-text-main">{theme.name}</span>
                
                {/* Visual Preview Dots */}
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full border border-text-dim/20" style={{ backgroundColor: theme.bg }}></div>
                  <div className="w-3 h-3 rounded-full border border-text-dim/20" style={{ backgroundColor: theme.accent }}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}