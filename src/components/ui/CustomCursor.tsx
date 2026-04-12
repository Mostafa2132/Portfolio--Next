"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const TRAIL_COUNT = 10; // More points for smoother mercury feel

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    const trails = trailRef.current;

    if (!cursor || !label) return;

    const xSetCursor = gsap.quickSetter(cursor, "x", "px");
    const ySetCursor = gsap.quickSetter(cursor, "y", "px");
    const xSetLabel = gsap.quickSetter(label, "x", "px");
    const ySetLabel = gsap.quickSetter(label, "y", "px");

    // Optimized Trail Setters
    const trailSetters = trails.map((dot, i) => ({
      xTo: gsap.quickTo(dot, "x", { duration: 0.1 + i * 0.03, ease: "power2.out" }),
      yTo: gsap.quickTo(dot, "y", { duration: 0.1 + i * 0.03, ease: "power2.out" }),
      scaleXTo: gsap.quickTo(dot, "scaleX", { duration: 0.2, ease: "power2.out" }),
      scaleYTo: gsap.quickTo(dot, "scaleY", { duration: 0.2, ease: "power2.out" }),
      rotationTo: gsap.quickTo(dot, "rotation", { duration: 0.2, ease: "power2.out" }),
    }));

    let mouse = { x: 0, y: 0 };
    let lastMouse = { x: 0, y: 0 };
    let isMagnetic = false;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mouse = { x, y };
      
      xSetCursor(x);
      ySetCursor(y);
      xSetLabel(x);
      ySetLabel(y);

      if (!isMagnetic) {
        // Calculate velocity and angle for stretching
        const dx = x - lastMouse.x;
        const dy = y - lastMouse.y;
        const velocity = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        // Dynamic stretch factor based on speed
        const stretch = Math.min(velocity * 0.04, 1.5); 
        
        trailSetters.forEach((setter, i) => {
          setter.xTo(x);
          setter.yTo(y);
          
          // Apply stretching effect to the tail
          if (velocity > 2) {
            setter.scaleXTo(1 + stretch * (i / TRAIL_COUNT));
            setter.scaleYTo(1 - (stretch * 0.5) * (i / TRAIL_COUNT));
            setter.rotationTo(angle);
          } else {
            setter.scaleXTo(1);
            setter.scaleYTo(1);
          }
        });
      }
      
      lastMouse = { x, y };
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, .project-card");
      
      if (clickable) {
        const text = clickable.getAttribute("data-cursor-text") || "";
        
        gsap.to(trails, {
          scale: text ? 5 : 3.5,
          backgroundColor: text ? "rgba(108, 99, 255, 0.4)" : "rgba(255, 255, 255, 0.2)",
          duration: 0.6,
          stagger: 0.01,
          ease: "expo.out"
        });

        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });

        if (text) {
          setCursorText(text);
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" });
        }

        // Strong Magnetic Pull for buttons
        if (clickable.tagName === "BUTTON" || clickable.classList.contains("magnetic")) {
          isMagnetic = true;
          const rect = clickable.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          trailSetters.forEach(setter => {
            setter.xTo(centerX);
            setter.yTo(centerY);
            setter.scaleXTo(1);
            setter.scaleYTo(1);
          });
          
          gsap.to(clickable, {
            x: (mouse.x - centerX) * 0.35,
            y: (mouse.y - centerY) * 0.35,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      } else {
        isMagnetic = false;
        setCursorText("");
        
        gsap.to(trails, {
          scale: 1,
          backgroundColor: "white",
          duration: 0.5,
          stagger: -0.01,
          ease: "power3.out"
        });

        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(label, { opacity: 0, scale: 0, duration: 0.3 });
        gsap.to("a, button, .magnetic", { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ mixBlendMode: 'exclusion' }}>
      {/* Liquid Gooey definitions */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 32 -18" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Mercury Trail */}
      <div style={{ filter: "url('#goo')" }} className="absolute inset-0">
        {[...Array(TRAIL_COUNT)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { if (el) trailRef.current[i] = el; }}
            className="absolute top-0 left-0 bg-white rounded-full translate-x-[-50%] translate-y-[-50%] shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            style={{ 
              width: `${36 - i * 2.5}px`,
              height: `${36 - i * 2.5}px`,
              opacity: 1 - i * 0.05
            }}
          />
        ))}
        {/* Cursor Point */}
        <div
          ref={cursorRef}
          className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full translate-x-[-50%] translate-y-[-50%]"
        />
      </div>

      {/* Dynamic Text Reveal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          ref={labelRef}
          className="text-[11px] font-black uppercase tracking-[0.3em] text-white absolute opacity-0 scale-0 pointer-events-none whitespace-nowrap blur-[0.2px]"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          {cursorText}
        </div>
      </div>
    </div>
  );
};
