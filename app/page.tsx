import { Hero } from "@/components/sections/Hero";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <main id="main" className="flex flex-1 flex-col">
        <Hero />
        <SelectedWorks />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
