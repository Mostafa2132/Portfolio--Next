"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { skills } from "@/data/skills";

export const SkillsSection = ({ isActive }: { isActive?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, scale: 0.5, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }
      );
    } else if (containerRef.current) {
      gsap.set(containerRef.current.children, { opacity: 0, scale: 0.5, y: 50 });
    }
  }, [isActive]);

  return (
    <section id="skills" className="w-full min-h-screen flex flex-col items-center justify-center shrink-0 px-6 py-20 lg:py-24 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-5xl w-full z-10">
        <h2 className="text-sm font-bold tracking-widest text-[var(--accent)] uppercase mb-2 text-center">Tech Stack</h2>
        <h3 className="text-3xl md:text-5xl font-black text-center mb-12 md:mb-16">My Toolkit</h3>
        
        <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8 group/grid">
          {skills.map((skill, i) => (
            <div 
              key={i}
              aria-label={skill.name}
              className="skill-item opacity-0 flex flex-col items-center gap-4 p-6 glass-panel rounded-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:bg-white/5 cursor-pointer group-hover/grid:opacity-40 hover:!opacity-100 hover:z-20 relative overflow-hidden group"
            >
              {/* Dynamic spotlight border effect on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" 
                style={{ background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 70%)` }}
              ></div>

              <div className="relative z-10 w-16 h-16 flex items-center justify-center bg-[var(--bg-secondary)] rounded-2xl border border-[var(--glass-border)] group-hover:border-transparent transition-colors duration-300">
                <skill.icon 
                  size={32} 
                  className="transition-transform duration-500 group-hover:scale-125" 
                  style={{ color: skill.color, filter: `drop-shadow(0 0 10px ${skill.color}50)` }}
                />
              </div>
              
              <span className="text-sm font-bold text-[var(--text-muted)] group-hover:text-white transition-colors relative z-10">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
