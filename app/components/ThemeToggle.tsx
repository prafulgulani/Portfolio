"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("theme-bert-dark");

  useEffect(() => {
    // Check local storage on load
    const savedTheme = localStorage.getItem("user-theme") || "theme-bert-dark";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme === "theme-bert-dark" ? "theme-armchair-light" : "theme-bert-dark";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("user-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 px-4 py-2 rounded-full border border-[--color-accent] text-[--color-accent] hover:bg-[--color-accent] hover:text-[--color-bg] transition-all"
    >
      {theme === "theme-bert-dark" ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}
