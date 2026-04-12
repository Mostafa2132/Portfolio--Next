import { useState, useEffect } from "react";

export function useActiveSection(sectionIds: string[], offset: number = 0) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      // In a horizontal scroll setup via GSAP, standard IntersectionObserver might need adjusting 
      // or we just calculate based on the horizontal position of sections inside the container.
      // For now, we will expose a setter that our GSAP ScrollTrigger can call directly since GSAP pins it.
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return { activeSection, setActiveSection };
}
