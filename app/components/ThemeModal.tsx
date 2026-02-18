'use client';
import { useState, useEffect, useRef } from 'react';
import { THEMES, Theme } from '../constants/themes';

export default function ThemeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState('theme-bert-dark');
  const menuRef = useRef<HTMLDivElement>(null);

  // 1. Function to actually "paint" the CSS variables
  const paintTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty('--bg-color', theme.bg);
    root.style.setProperty('--text-main', theme.textMain);
    root.style.setProperty('--text-dim', theme.textDim);
    root.style.setProperty('--accent-color', theme.accent);
    root.style.setProperty('--accent-soft', theme.accentSoft);
    
    // Update Favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="${theme.accent}" /><text x="16" y="21" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="${theme.bg}">PG</text></svg>`;
      favicon.setAttribute('href', `data:image/svg+xml,${encodeURIComponent(svgCode)}`);
    }
  };

  // 2. Click handler: Save and Close
  const handleSelect = (theme: Theme) => {
    paintTheme(theme);
    setActiveThemeId(theme.id);
    localStorage.setItem('user-theme', theme.id);
    setIsOpen(false); // Closes the menu
  };

  // 3. Hover handler: Just preview
  const handleHover = (theme: Theme) => {
    paintTheme(theme);
  };

  // 4. Reset on Mouse Leave: If they don't click, go back to saved theme
  const handleMouseLeaveMenu = () => {
    const savedId = localStorage.getItem('user-theme') || 'theme-bert-dark';
    const savedTheme = THEMES.find(t => t.id === savedId) || THEMES[0];
    paintTheme(savedTheme);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initial Load
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
                <span className="text-sm font-semibold text-tx-main">{theme.name}</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.bg }}></div>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}