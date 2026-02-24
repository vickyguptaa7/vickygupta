import { Footer } from "@/components/common/footer";
import { Separator } from "@/components/common/separator";
import { AboutSection } from "@/components/sections/about/about-section";
import { CertificationsSection } from "@/components/sections/certifications/certifications-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { EducationSection } from "@/components/sections/education/education-section";
import { ExperienceSection } from "@/components/sections/experience/experience-section";
import { GitHubHeatmapSection } from "@/components/sections/github-heatmap/github-heatmap";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { HonorsSection } from "@/components/sections/honors/honors-section";
import { ProjectsSection } from "@/components/sections/projects/projects-section";
import { SocialLinksSection } from "@/components/sections/social-links/social-links-section";
import { StackSection } from "@/components/sections/stack/stack-section";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <div className="mx-auto md:max-w-3xl">
        <HeroSection />
        <SocialLinksSection />
        <Separator />

        <AboutSection />
        <div className="flex h-4 w-full border-x border-edge" />

        <GitHubHeatmapSection />
        <Separator />

        <StackSection />
        <Separator />

        <ExperienceSection />
        <Separator />

        <EducationSection />
        <Separator />

        <ProjectsSection />
        <Separator />

        <HonorsSection />
        <Separator />

        <CertificationsSection />
        <Separator />

        <ContactSection />
        <Separator />

        <Footer />
      </div>
    </main>
  );
}
