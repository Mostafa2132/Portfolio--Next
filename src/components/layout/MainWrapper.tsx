"use client";

import { useRef, useState, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ToastContainer } from "react-toastify";
import { SectionProvider } from "@/context/SectionContext";
import "react-toastify/dist/ReactToastify.css";

// Register ScrollTrigger once
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface MainWrapperProps {
  children: ReactNode;
}

export const MainWrapper = ({ children }: MainWrapperProps) => {
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

    // Mobile: Vertical Scroll
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
    <SectionProvider value={{ activeSection, loadingComplete }}>
      <CustomCursor />
      
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />

      <div className={`transition-opacity duration-700 ${loadingComplete ? "opacity-100" : "opacity-0"}`} style={{ visibility: loadingComplete ? 'visible' : 'hidden' }}>
        <Navbar activeSection={activeSection} />
        <ScrollProgress />
        
        <main className="relative w-full bg-[var(--bg-primary)] overflow-x-hidden">
          <div ref={wrapperRef} className="w-full lg:h-screen lg:overflow-hidden relative" id="scroll-wrapper">
            <div 
              ref={containerRef} 
              className="flex flex-col lg:flex-row w-full lg:w-[600vw] lg:h-screen" 
            >
              {children}
            </div>
          </div>
        </main>

        <Footer />
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </SectionProvider>
  );
};
