"use client";

import { Footer } from "@/components/common/footer";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { SectionNav } from "@/components/common/section-nav";
import { Separator } from "@/components/common/separator";
import { AboutSection } from "@/components/sections/about/about-section";
import { CertificationsSection } from "@/components/sections/certifications/certifications-section";
import { CodingProfilesSection } from "@/components/sections/coding-profiles/coding-profiles-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { EducationSection } from "@/components/sections/education/education-section";
import { ExperienceSection } from "@/components/sections/experience/experience-section";
import { GitHubHeatmapSection } from "@/components/sections/github-heatmap/github-heatmap";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { HonorsSection } from "@/components/sections/honors/honors-section";
import { ProjectsSection } from "@/components/sections/projects/projects-section";
import { StackSection } from "@/components/sections/stack/stack-section";
import { useGlobalSpotlight } from "@/hooks/useGlobalSpotlight";

const homeSections = [
  { id: "about", component: AboutSection, delay: 0 },
  { id: "experience", component: ExperienceSection, delay: 0 },
  { id: "projects", component: ProjectsSection, delay: 0 },
  { id: "stack", component: StackSection, delay: 0 },
  { id: "github", component: GitHubHeatmapSection, delay: 0.05 },
  { id: "coding-profiles", component: CodingProfilesSection, delay: 0.05 },
  { id: "education", component: EducationSection, delay: 0.05 },
  { id: "certifications", component: CertificationsSection, delay: 0.05 },
  { id: "honors", component: HonorsSection, delay: 0 },
  { id: "contact", component: ContactSection, delay: 0 },
] as const;

function PortfolioContainer() {
  useGlobalSpotlight();
  return (
    <>
      <SectionNav />
      <main
        id="main-content"
        className="mt-3 w-full overflow-x-hidden px-3 sm:px-0 pt-11 sm:mt-4 sm:pt-12"
      >
        <HeroSection />
        <Separator />

        {homeSections.map(({ id, component: Component, delay }) => (
          <div key={id}>
            <ScrollReveal delay={delay}>
              <Component />
            </ScrollReveal>
            <Separator />
          </div>
        ))}

        <Footer />
        <Separator />
      </main>
    </>
  );
}

export default PortfolioContainer;
