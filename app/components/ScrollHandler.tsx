"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // We wrap this in a timeout because Next.js hydration or data fetching 
    // might shift the layout height after the initial load.
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace("#", "");
      
      // Use a small delay to ensure the DOM has fully "settled"
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 500); 

      return () => clearTimeout(timeoutId);
    }
  }, [pathname, searchParams]); // Re-run if the path changes

  return null; // This component renders nothing visually
}