"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");

  useGSAP(() => {
    if (!loadingComplete || !containerRef.current || !wrapperRef.current) return;

    const sections = gsap.utils.toArray(".horizontal-section") as HTMLElement[];
    const scrollContainer = containerRef.current;
    const wrapper = wrapperRef.current;

    const mm = gsap.matchMedia();

    // Desktop: Horizontal Scroll
    mm.add("(min-width: 1024px)", () => {
      const scrollTween = gsap.to(scrollContainer, {
        xPercent: -100 * (sections.length - 1) / sections.length,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollContainer.scrollWidth - window.innerWidth}`,
          onUpdate: (self) => {
            const currentIndex = Math.round(self.progress * (sections.length - 1));
            const ids = ["hero", "about", "skills", "projects", "services", "contact"];
            if (ids[currentIndex]) {
              setActiveSection(ids[currentIndex]);
            }
          }
        }
      });
      return () => scrollTween.kill();
    });

    // Mobile: Vertical Scroll (Progress Sync)
    mm.add("(max-width: 1023px)", () => {
      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              const ids = ["hero", "about", "skills", "projects", "services", "contact"];
              setActiveSection(ids[i]);
            }
          }
        });
      });
    });

    return () => mm.revert();
  }, { dependencies: [loadingComplete] });

  return (
    <>
      <CustomCursor />
      
      {!loadingComplete && (
        <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      )}

      {loadingComplete && (
        <>
          <Navbar activeSection={activeSection} />
          <ScrollProgress />
          
          <main className="relative w-full bg-[var(--bg-primary)] overflow-x-hidden">
            <div ref={wrapperRef} className="w-full lg:h-screen lg:overflow-hidden relative" id="scroll-wrapper">
              <div 
                ref={containerRef} 
                className="flex flex-col lg:flex-row w-full lg:w-[600vw] lg:h-screen" 
              >
                <div className="horizontal-section w-full lg:w-screen shrink-0" id="hero"><HeroSection isActive={activeSection === "hero"} /></div>
                <div className="horizontal-section w-full lg:w-screen shrink-0" id="about"><AboutSection isActive={activeSection === "about"} /></div>
                <div className="horizontal-section w-full lg:w-screen shrink-0" id="skills"><SkillsSection isActive={activeSection === "skills"} /></div>
                <div className="horizontal-section w-full lg:w-screen shrink-0" id="projects"><ProjectsSection isActive={activeSection === "projects"} /></div>
                <div className="horizontal-section w-full lg:w-screen shrink-0" id="services"><ServicesSection isActive={activeSection === "services"} /></div>
                <div className="horizontal-section w-full lg:w-screen shrink-0" id="contact"><ContactSection isActive={activeSection === "contact"} /></div>
              </div>
            </div>
          </main>

          <Footer />
        </>
      )}
      
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}
