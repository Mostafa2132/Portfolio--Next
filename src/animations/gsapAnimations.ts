import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateFadeIn = (element: Element | null, delay: number = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, delay, ease: "power3.out" }
  );
};

export const animateStaggerText = (elements: Element[] | NodeListOf<Element>, delay: number = 0) => {
  if (!elements || elements.length === 0) return;
  gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      delay,
      ease: "power2.out",
    }
  );
};
