"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { personalInfo } from "@/data/personalInfo";
import { FaGlobe } from "react-icons/fa";
import { useSection } from "@/context/SectionContext";

export const AboutSection = () => {
  const { activeSection, loadingComplete } = useSection();
  const isActive = activeSection === "about";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadingComplete) return;
    
    if (isActive && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    } else if (containerRef.current) {
      gsap.set(containerRef.current.children, { opacity: 0, y: 30, scale: 0.95 });
    }
  }, [isActive, loadingComplete]);

  return (
    <section id="about" className="w-full min-h-screen flex flex-col items-center justify-center shrink-0 px-6 py-20 lg:py-24 relative overflow-hidden">
      
      {/* Background Watermark Text - Adjusted for mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] md:text-[15vw] font-black text-[var(--glass)] pointer-events-none whitespace-nowrap z-0 tracking-tighter mix-blend-overlay opacity-50 uppercase" aria-hidden="true">
        MOSTAFA
      </div>

      <div ref={containerRef} className="max-w-6xl w-full z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Main Introduction */}
        <div className="about-item opacity-0 md:col-span-2 glass-panel p-8 md:p-12 rounded-3xl flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-[80px] group-hover:bg-[var(--accent)]/20 transition-colors duration-700"></div>
          <h2 className="text-sm font-bold tracking-widest text-[var(--accent)] uppercase mb-4">About Me</h2>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            I craft digital <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]">experiences.</span>
          </h3>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl relative z-10">
            {personalInfo.about}
          </p>
        </div>

        {/* Card 2: Visual Placeholder */}
        <div className="about-item opacity-0 glass-panel p-8 rounded-3xl flex items-center justify-center relative overflow-hidden group min-h-[250px]">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent-2)]/10 transition-opacity group-hover:opacity-100 opacity-50"></div>
          <div className="w-32 h-32 rounded-full border border-[var(--glass-border)] flex items-center justify-center animate-[spin_10s_linear_infinite]">
             <div className="w-24 h-24 rounded-full border border-[var(--accent)]/30 flex items-center justify-center animate-[spin_15s_linear_infinite_reverse]">
                 <div className="w-16 h-16 rounded-full border border-[var(--accent-2)]/20 flex items-center justify-center">
                    <span className="text-3xl animate-pulse"><FaGlobe className="text-[var(--accent)]" /></span>
                 </div>
             </div>
          </div>
          <div className="absolute bottom-6 left-6">
            <p className="text-sm font-bold text-[var(--text-primary)]">Based in</p>
            <p className="text-xs text-[var(--text-muted)]">Egypt & Worldwide</p>
          </div>
        </div>

        {/* Card 3: Experience Stat */}
        <div className="about-item opacity-0 glass-panel p-8 rounded-3xl flex flex-col justify-between group overflow-hidden relative min-h-[200px]">
          <div className="absolute -bottom-10 -right-10 text-[10rem] opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all font-black text-white mix-blend-overlay">
            2
          </div>
          <div className="text-[var(--accent-2)] fill-current mb-4 w-10 h-10">
             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <div className="text-5xl font-black text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-2)] transition-colors">2+</div>
            <div className="text-sm text-[var(--text-muted)] uppercase tracking-wide">Years Experience</div>
          </div>
        </div>

        {/* Card 4: Projects Stat */}
        <div className="about-item opacity-0 md:col-span-2 glass-panel p-8 rounded-3xl flex items-center justify-between group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/5 to-[var(--accent-2)]/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
          <div>
            <div className="text-5xl font-black text-[var(--text-primary)] mb-2 group-hover:translate-x-2 transition-transform">20+</div>
            <div className="text-sm text-[var(--text-muted)] uppercase tracking-wide">Projects Completed</div>
          </div>
          <div className="text-7xl opacity-20 transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500 text-[var(--accent)]">
             ⚡
          </div>
        </div>
      </div>
    </section>
  );
};
