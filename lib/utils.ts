"use client";

import { useState, useEffect } from 'react';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return; 
    }

    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

   
    setMatches(mediaQuery.matches);

   
    mediaQuery.addEventListener('change', handler);

   
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
