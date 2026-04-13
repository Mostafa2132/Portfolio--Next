"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Speed up progress for better Performance score
      currentProgress += Math.floor(Math.random() * 25) + 15;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
        
        // Setup the exit animation
        const tl = gsap.timeline({ onComplete });
        
        if (textRef.current) {
          tl.to(textRef.current, { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" });
        }
        
        if (containerRef.current) {
          tl.to(containerRef.current, {
            yPercent: -100,
            duration: 0.6,
            ease: "expo.inOut"
          });
        }
      }
    }, 80); // Lowered from 150ms

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--bg-primary)] text-white"
    >
      <h1 ref={textRef} className="text-6xl font-black md:text-8xl flex flex-col items-center">
        <span className="text-[var(--accent)] text-lg uppercase tracking-widest mb-4">Loading</span>
        <span>{progress}%</span>
      </h1>
      <div className="w-64 h-1 bg-[var(--glass-border)] mt-8 overflow-hidden rounded-full">
        <div 
          className="h-full bg-[var(--accent)] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
