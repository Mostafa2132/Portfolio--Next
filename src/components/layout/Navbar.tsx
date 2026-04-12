"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { personalInfo } from "@/data/personalInfo";

const navLinks = [
  { name: "Home", id: "hero" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Services", id: "services" },
  { name: "Contact", id: "contact" },
];

export const Navbar = ({ activeSection }: { activeSection: string }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile Menu Animation
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at 90% 10%)",
        duration: 0.8,
        ease: "power3.inOut"
      });
      if (linksRef.current) {
        gsap.fromTo(linksRef.current.children, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power2.out" }
        );
      }
    } else {
      document.body.style.overflow = "auto";
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 90% 10%)",
        duration: 0.6,
        ease: "power3.inOut"
      });
    }
  }, [isMenuOpen]);

  const handleNavClick = (id: string, index: number) => {
    setIsMenuOpen(false);
    
    // Check if we are in horizontal (desktop) or vertical (mobile) mode
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      // In horizontal scroll, sections are spaced by window.innerWidth
      const targetScroll = index * window.innerWidth;
      gsap.to(window, {
        scrollTo: targetScroll,
        duration: 1,
        ease: "power3.inOut"
      });
    } else {
      // In vertical scroll, standard section ID positioning
      const target = document.getElementById(id);
      if (target) {
        gsap.to(window, {
          scrollTo: { y: target, autoKill: false },
          duration: 1,
          ease: "power3.inOut"
        });
      }
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[9995] transition-all duration-500 ${
          scrolled ? "py-4 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--glass-border)] shadow-xl" : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Reverted Logo */}
          <div 
            className="text-2xl font-black tracking-tighter cursor-pointer group flex items-center gap-1" 
            onClick={() => handleNavClick("hero", 0)}
            role="button"
            aria-label="Back to top"
          >
            ME<span className="text-[var(--accent)] transition-transform duration-500 group-hover:rotate-12 inline-block">.</span>
          </div>

          {/* Desktop Links - Reverted Style */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id, i)}
                aria-current={activeSection === link.id ? "page" : undefined}
                className={`text-xs font-bold tracking-[0.2em] uppercase transition-all hover:text-[var(--accent)] relative group/link ${
                  activeSection === link.id ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-[var(--accent)] transition-all duration-500 ${activeSection === link.id ? "w-full" : "w-0 group-hover/link:w-full"}`}></span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[var(--accent)] z-[9999] relative w-10 h-10 flex items-center justify-center glass-panel rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-4 relative flex flex-col justify-between" aria-hidden="true">
              <span className={`w-full h-0.5 bg-current transition-all duration-500 rounded-full ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
              <span className={`w-full h-0.5 bg-current transition-all duration-500 rounded-full ${isMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`w-full h-0.5 bg-current transition-all duration-500 rounded-full ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        id="mobile-menu"
        className="fixed inset-0 bg-[var(--bg-primary)] z-[9980] flex flex-col items-center justify-center md:hidden"
        style={{ clipPath: "circle(0% at 90% 10%)" }}
        aria-hidden={!isMenuOpen}
      >
        <nav ref={linksRef} className="flex flex-col items-center gap-8" aria-label="Mobile Navigation">
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id, i)}
              aria-current={activeSection === link.id ? "page" : undefined}
              className={`text-3xl font-black uppercase tracking-tighter transition-all hover:scale-110 active:scale-95 ${
                activeSection === link.id ? "text-[var(--accent)]" : "text-white"
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-12 flex gap-6 text-[var(--accent)] opacity-50">
          <span className="text-xs font-bold tracking-[0.3em] uppercase">Connect With Me</span>
        </div>
      </div>
    </>
  );
};
