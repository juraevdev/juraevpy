import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy";
import { TechStack } from "@/components/sections/TechStack";
import { EngineeringProcess } from "@/components/sections/EngineeringProcess";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <main id="main" className="flex flex-1 flex-col">
        <Hero />
        <AboutSection />
        <SelectedWorks />
        <FeaturedCaseStudy />
        <TechStack />
        <EngineeringProcess />
        <ExperienceTimeline />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
