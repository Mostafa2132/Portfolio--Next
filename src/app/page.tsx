import dynamic from "next/dynamic";
import { MainWrapper } from "@/components/layout/MainWrapper";
import { HeroSection } from "@/components/sections/HeroSection";

// Dynamic imports for improved performance remaining sections
const AboutSection = dynamic(() => import("@/components/sections/AboutSection").then(mod => mod.AboutSection), { ssr: true });
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection").then(mod => mod.SkillsSection), { ssr: true });
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection").then(mod => mod.ProjectsSection), { ssr: true });
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection").then(mod => mod.ServicesSection), { ssr: true });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection").then(mod => mod.ContactSection), { ssr: true });

export default function Home() {
  return (
    <MainWrapper>
      <div className="horizontal-section w-full lg:w-screen shrink-0" id="hero">
        <HeroSection />
      </div>
      <div className="horizontal-section w-full lg:w-screen shrink-0" id="about">
        <AboutSection />
      </div>
      <div className="horizontal-section w-full lg:w-screen shrink-0" id="skills">
        <SkillsSection />
      </div>
      <div className="horizontal-section w-full lg:w-screen shrink-0" id="projects">
        <ProjectsSection />
      </div>
      <div className="horizontal-section w-full lg:w-screen shrink-0" id="services">
        <ServicesSection />
      </div>
      <div className="horizontal-section w-full lg:w-screen shrink-0" id="contact">
        <ContactSection />
      </div>
    </MainWrapper>
  );
}
