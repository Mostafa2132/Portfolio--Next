"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { personalInfo } from "@/data/personalInfo";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useSection } from "@/context/SectionContext";

const rotatingWords = ["Mostafa Ebrahem", "Frontend Developer", "Animation Expert", "Creative Coder"];

export const HeroSection = () => {
  const { activeSection, loadingComplete } = useSection();
  const isActive = activeSection === "hero";
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadingComplete) return;

    const ctx = gsap.context(() => {
      // ── 1. Initial set from Tailwind/CSS handles the rest ──────────
      // GSAP will animate from 0 to 1
      
      const words = gsap.utils.toArray<HTMLSpanElement>(
        wordsRef.current?.querySelectorAll("span") || []
      );

      // ── 2. Build entrance timeline ─────────────────────────────────
      const tl = gsap.timeline({ delay: 0.1 });

      // "Hello, I'm" — each word slides up
      const greetingSpans =
        titleRef.current?.querySelectorAll("span.word") ?? [];

      if (greetingSpans.length) {
        tl.to(greetingSpans, {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power4.out",
        });
      }

      // First rotating word appears right after greeting
      if (words.length) {
        tl.to(
          words[0],
          { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" },
          "-=0.25"
        );
      }

      // Tagline
      if (subtitleRef.current) {
        tl.to(
          subtitleRef.current,
          { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" },
          "-=0.3"
        );
      }

      // Buttons
      if (btnsRef.current?.children) {
        tl.to(
          btnsRef.current.children,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.7)",
          },
          "-=0.35"
        );
        // Make sure scale starts from 0.85
        gsap.set(btnsRef.current.children, { scale: 0.85 });
      }

      // ── 3. Start word rotator AFTER entrance is done ───────────────
      tl.call(() => {
        if (!words.length) return;

        let current = 0;

        const rotate = () => {
          const next = (current + 1) % words.length;

          gsap
            .timeline()
            .to(words[current], {
              autoAlpha: 0,
              y: -50,
              duration: 0.5,
              ease: "power2.inOut",
            })
            .to(
              words[next],
              { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
              "-=0.15"
            )
            .call(() => {
              current = next;
            });
        };

        // First swap after 3s, then every 3s
        setInterval(rotate, 3000);
      });
    }); // end gsap.context

    return () => ctx.revert();
  }, [loadingComplete]);

  return (
    <section
      id="hero"
      className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden shrink-0 py-20 lg:py-0"
    >
      {/* Background orbs */}
      <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-[var(--accent)] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" aria-hidden="true" />
      <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-[var(--accent-2)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" aria-hidden="true" />

      <div className="z-10 text-center px-6 max-w-5xl w-full">
        {/* ── Heading ── */}
        <h1
          ref={titleRef}
          className="font-black mb-10 flex flex-col items-center justify-center w-full"
        >
          {/* "Hello, I'm" — each word is a span.word for GSAP targeting */}
          <div className="flex justify-center gap-x-3 tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
            {"Hello, I'm".split(" ").map((word, i) => (
              <span
                key={i}
                // ↑ class="word" lets GSAP select these precisely
                className="word inline-block whitespace-nowrap opacity-0 translate-y-10"
              >
                {word}
              </span>
            ))}
          </div>

          {/* ── Rotating words container ── */}
          <div className="relative h-[60px] md:h-[120px] w-full overflow-hidden px-4">
            <div
              ref={wordsRef}
              className="absolute inset-0 w-full h-full flex justify-center items-center"
            >
              {rotatingWords.map((word, i) => (
                <span
                  key={i}
                  className="absolute w-full text-center text-[var(--accent)] uppercase text-2xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.2em] md:tracking-[0.1em] whitespace-nowrap opacity-0"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </h1>

        {/* ── Tagline ── */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-[var(--text-muted)] mb-10 md:mb-12 max-w-2xl mx-auto font-medium px-4 opacity-0 translate-y-10"
        >
          {personalInfo.tagline}
        </p>

        {/* ── Buttons ── */}
        <div ref={btnsRef} className="flex flex-wrap gap-4 md:gap-6 justify-center px-4">
          <a
            href={personalInfo.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact via WhatsApp"
            className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-[var(--accent)] text-white rounded-full font-bold transition-all duration-300 pointer-events-auto relative z-20 whatsapp-glow hover:scale-105 active:scale-95 text-sm md:text-base opacity-0 translate-y-10"
          >
            <FaWhatsapp size={20} /> Let&apos;s Talk
          </a>
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex items-center gap-2 px-4 md:px-5 py-3 md:py-4 bg-[var(--glass)] border border-[var(--glass-border)] rounded-full transition-all duration-500 pointer-events-auto relative z-20 github-glow hover:scale-110 active:scale-90 opacity-0 translate-y-10"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="flex items-center gap-2 px-4 md:px-5 py-3 md:py-4 bg-[var(--glass)] border border-[var(--glass-border)] rounded-full transition-all duration-500 pointer-events-auto relative z-20 linkedin-glow hover:scale-110 active:scale-90 opacity-0 translate-y-10"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};