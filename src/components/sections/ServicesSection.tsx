"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { services } from "@/data/services";

export const ServicesSection = ({ isActive }: { isActive?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 50, rotateX: -45 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    } else if (containerRef.current) {
      gsap.set(containerRef.current.children, { opacity: 0, y: 50, rotateX: -45 });
    }
  }, [isActive]);

  return (
    <section id="services" className="w-full min-h-screen flex flex-col items-center justify-center shrink-0 px-6 py-20 lg:py-32 relative" style={{ perspective: "1000px" }}>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--accent-2)]/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl w-full z-10">
        <h2 className="text-sm font-bold tracking-widest text-[var(--accent)] uppercase mb-2 text-center md:text-left">What I Do</h2>
        <h3 className="text-3xl md:text-5xl font-black mb-12 md:mb-16 text-center md:text-left">My Services</h3>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div 
              key={service.id}
              className="service-card opacity-0 p-8 bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-3xl hover:-translate-y-4 hover:border-[var(--accent)] transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[var(--glass)] border border-[var(--glass-border)] flex items-center justify-center mb-8 group-hover:bg-[var(--accent)] transition-colors duration-300">
                <service.icon size={28} className="text-[var(--accent-2)] group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="text-xl font-bold mb-4">{service.title}</h4>
              <p className="text-[var(--text-muted)] leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
