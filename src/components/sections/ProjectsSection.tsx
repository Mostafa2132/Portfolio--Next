"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { projects } from "@/data/projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useSection } from "@/context/SectionContext";
import Link from "next/link";
// Add the missing import at the top of the file

export const ProjectsSection = () => {
  const { activeSection, loadingComplete } = useSection();
  const isActive = activeSection === "projects";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadingComplete) return;

    if (isActive && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    } else if (containerRef.current) {
      gsap.set(containerRef.current.children, { opacity: 0, x: 100 });
    }
  }, [isActive, loadingComplete]);

  return (
    <section id="projects" className="w-full min-h-screen flex flex-col items-center justify-center shrink-0 px-6 py-20 lg:py-24">
      <div className="max-w-[95vw] md:max-w-7xl w-full">
        <h2 className="text-sm font-bold tracking-widest text-[var(--accent)] uppercase mb-2 text-center md:text-left">Portfolio</h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-12">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-center md:text-left">Latest Works</h3>
          <Link href="/projects" className="flex md:flex items-center gap-2 text-[var(--accent-2)] md:text-[var(--text-muted)] hover:text-[var(--accent-2)] transition-colors text-xs md:text-sm font-bold tracking-widest uppercase group mt-4 md:mt-0">
             All Projects <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        
        <div ref={containerRef} className="flex gap-6 md:gap-10 overflow-x-auto overflow-y-hidden px-4 py-8 md:py-12 w-full snap-x snap-mandatory hide-scroll" style={{ perspective: '1500px' }}>
          {projects.slice(0, 4).map((project, i) => (
            <div 
              key={project.id}
              data-cursor-text="VIEW"
              className="project-card snap-center opacity-0 w-[85vw] sm:w-[320px] md:w-[380px] shrink-0 glass-panel rounded-3xl overflow-hidden group transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-t border-[var(--glass-border)]"
            >
              <div className="h-48 md:h-56 bg-[var(--bg-primary)] relative overflow-hidden">
                {/* Dynamic Ambient Background */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-50 transition-opacity duration-700 bg-[var(--bg-secondary)]" 
                     style={{ backgroundImage: `radial-gradient(circle at center, ${project.color} 0%, transparent 70%)` }}>
                </div>
                
                {/* Abstract Text Cover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 transition-transform duration-700 group-hover:scale-110">
                   <h1 className="text-5xl md:text-6xl font-black opacity-10 uppercase tracking-tighter" style={{ color: project.color }}>
                      {project.title.substring(0, 4)}
                   </h1>
                </div>

                {/* Hover Action Drawer */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 z-20">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor-text="GITHUB" aria-label={`View ${project.title} on GitHub`} className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl translate-y-10 group-hover:translate-y-0 duration-500">
                    <FaGithub size={18} />
                  </a>
                  {project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" data-cursor-text="LIVE" aria-label={`View ${project.title} live demo`} className="p-3 rounded-full text-white hover:scale-110 transition-transform shadow-xl translate-y-10 group-hover:translate-y-0 duration-500 delay-75" style={{ backgroundColor: project.color }}>
                      <FaExternalLinkAlt size={18} />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-5 md:p-6 relative">
                {/* Subtle top inner glow */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                <h4 className="text-xl font-black mb-2 tracking-tight group-hover:text-white transition-colors">{project.title}</h4>
                <p className="text-[var(--text-muted)] mb-4 md:mb-6 line-clamp-2 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(techItem => (
                    <span 
                      key={techItem} 
                      className="text-[10px] font-bold px-3 py-1.5 bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-full transition-colors group-hover:border-opacity-50"
                      style={{ color: project.color, borderColor: `${project.color}30` }}
                    >
                      {techItem}
                    </span>
                  ))}
                </div>

                {/* Mobile Action Row - Visible only on mobile */}
                <div className="md:hidden flex items-center gap-3 mt-6 pt-5 border-t border-[var(--glass-border)]">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider font-extrabold transition-all active:scale-95 text-white/80 hover:text-white"
                  >
                    <FaGithub size={14} /> Code
                  </a>
                  {project.live !== "#" && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-white text-[10px] uppercase tracking-wider font-extrabold transition-all active:scale-95 shadow-lg"
                      style={{ 
                        backgroundColor: project.color,
                        boxShadow: `0 10px 20px -10px ${project.color}aa`
                      }}
                    >
                      <FaExternalLinkAlt size={12} /> Preview
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* View All Card for Mobile or end of list */}
          <div className="project-card snap-center opacity-0 shrink-0 w-[85vw] sm:w-[320px] md:w-[380px] min-h-[300px] flex items-center justify-center glass-panel rounded-3xl border-t border-[var(--glass-border)] group hover:-translate-y-2 transition-all duration-500">
             <Link href="/projects" className="flex flex-col items-center gap-6 text-[var(--text-muted)] hover:text-white transition-colors w-full h-full justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-[var(--glass-border)] group-hover:border-[var(--accent)] flex items-center justify-center transition-colors group-hover:bg-[var(--accent)]/10">
                  <span className="text-3xl group-hover:translate-x-2 transition-transform text-[var(--text-primary)]">→</span>
                </div>
                <span className="font-bold tracking-widest uppercase text-sm text-center">View All<br/>GitHub Repos</span>
             </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
