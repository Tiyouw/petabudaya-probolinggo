"use client";

import { useState, useEffect, useCallback } from "react";

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
}

export function useScrollSpy({ sectionIds, offset = 0 }: UseScrollSpyOptions) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollPos = window.scrollY + offset + 100;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (el) {
        const { offsetTop, offsetHeight } = el;
        if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
          setActiveIndex(i);
          return;
        }
      }
    }
    setActiveIndex(0);
  }, [sectionIds, offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = useCallback(
    (index: number) => {
      const el = document.getElementById(sectionIds[index]);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [sectionIds]
  );

  return { activeIndex, scrollTo };
}
