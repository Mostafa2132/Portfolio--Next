"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updateProgress = () => {
      // In a horizontal pin setup, we can track the page's vertical scroll
      // Because ScrollTrigger pins it and turns vertical scroll into horizontal movement.
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress((scrollY / docHeight) * 100);
      }
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9998] bg-[var(--glass)]">
      <div 
        className="h-full bg-[var(--accent)] origin-left"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
