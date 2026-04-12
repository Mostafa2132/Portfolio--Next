"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { personalInfo } from "@/data/personalInfo";

export const ContactSection = ({ isActive }: { isActive?: boolean }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isActive && containerRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        containerRef.current.querySelector(".contact-header"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      ).fromTo(
        containerRef.current.querySelectorAll(".contact-item"),
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      ).fromTo(
        containerRef.current.querySelector(".contact-form"),
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        "-=0.6"
      );
    }
  }, [isActive]);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        }
      );

      if (result.status === 200) {
        toast.success("Message sent successfully! 🚀");
        formRef.current.reset();
      } else {
        throw new Error(`EmailJS responded with status: ${result.status}`);
      }
    } catch (error: any) {
      console.error("EmailJS Full Error:", error);
      const errorMessage = error?.text || error?.message || "Verify your EmailJS configuration.";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full min-h-screen flex flex-col items-center justify-center shrink-0 px-6 py-20 lg:py-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[var(--accent-2)]/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div ref={containerRef} className="max-w-6xl w-full z-10">
        <div className="contact-header mb-8 md:mb-12 text-center md:text-left">
          <h2 className="text-sm font-bold tracking-widest text-[var(--accent)] uppercase mb-2">Get In Touch</h2>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight">Let&apos;s Create <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]">Something Great.</span></h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-2 space-y-4 md:space-y-8">
            <div className="contact-item p-4 md:p-6 glass-panel rounded-3xl border border-[var(--glass-border)] group hover:border-[var(--accent)]/50 transition-colors">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all">
                  <FaEnvelope size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold mb-0.5">Email Me</p>
                  <a href={`mailto:${personalInfo.contact.email}`} className="text-sm md:text-lg font-bold hover:text-[var(--accent)] transition-colors">
                    {personalInfo.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-item p-4 md:p-6 glass-panel rounded-3xl border border-[var(--glass-border)] group hover:border-[var(--accent-2)]/50 transition-colors">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[var(--accent-2)]/10 flex items-center justify-center text-[var(--accent-2)] group-hover:bg-[var(--accent-2)] group-hover:text-white transition-all">
                  <FaMapMarkerAlt size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold mb-0.5">Location</p>
                  <p className="text-sm md:text-lg font-bold">Menoufia, Egypt</p>
                </div>
              </div>
            </div>

            <div className="contact-item flex gap-4 pt-2 md:pt-4">
              <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" aria-label="Github Profile" className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel flex items-center justify-center border border-[var(--glass-border)] transition-all duration-500 github-glow hover:scale-125 hover:-translate-y-2">
                <FaGithub size={18} />
              </a>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel flex items-center justify-center border border-[var(--glass-border)] transition-all duration-500 linkedin-glow hover:scale-125 hover:-translate-y-2">
                <FaLinkedin size={18} />
              </a>
              <a href={personalInfo.socials.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Contact" className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel flex items-center justify-center border border-[var(--glass-border)] transition-all duration-500 whatsapp-glow hover:scale-125 hover:-translate-y-2">
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="contact-form lg:col-span-3">
            <form ref={formRef} onSubmit={sendEmail} className="glass-panel p-6 md:p-10 rounded-[2rem] border border-[var(--glass-border)] relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] ml-2">Name</label>
                  <input 
                    id="name"
                    type="text" 
                    name="user_name" 
                    required 
                    aria-required="true"
                    placeholder="John Doe"
                    className="w-full px-5 py-3 md:py-4 bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-2xl focus:outline-none focus:border-[var(--accent)] transition-colors text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] ml-2">Email</label>
                  <input 
                    id="email"
                    type="email" 
                    name="user_email" 
                    required 
                    aria-required="true"
                    placeholder="john@example.com"
                    className="w-full px-5 py-3 md:py-4 bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-2xl focus:outline-none focus:border-[var(--accent)] transition-colors text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1.5 mb-6 md:mb-8">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] ml-2">Message</label>
                <textarea 
                  id="message"
                  name="message" 
                  rows={3} 
                  required 
                  aria-required="true"
                  placeholder="How can I help you?"
                  className="w-full px-5 py-3 md:py-4 bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-2xl focus:outline-none focus:border-[var(--accent)] transition-colors resize-none text-sm"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                data-cursor-text="SEND"
                className="w-full md:w-auto px-10 py-3.5 md:py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white font-bold rounded-2xl shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0 text-sm"
              >
                {isSubmitting ? "Sending..." : <>Send Message <FaPaperPlane size={14} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};