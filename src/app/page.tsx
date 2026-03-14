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

export default function Home() {
  return (
    <>
      <SectionNav />
      <main id="main-content" className="w-full overflow-x-hidden pt-12 mt-4">
        <div
          className="mx-auto md:max-w-5xl px-[128px]"
          style={{
            maskImage:
              "linear-gradient(to right, #000 0%, black 80px, black calc(100% - 80px), #000 100%), radial-gradient(ellipse 400px 300px at 50% 30%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.5) 85%, #000 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, #000 0%, black 80px, black calc(100% - 80px), #000 100%), radial-gradient(ellipse 400px 300px at 50% 30%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.5) 85%, #000 100%)",
          }}
        >
          <HeroSection />
          <Separator />

          <ScrollReveal>
            <AboutSection />
          </ScrollReveal>
          <Separator />

          <ScrollReveal delay={0.05}>
            <CodingProfilesSection />
          </ScrollReveal>
          <div className="flex h-2 w-full border-x border-edge" />

          <ScrollReveal delay={0.05}>
            <GitHubHeatmapSection />
          </ScrollReveal>
          <Separator />

          <ScrollReveal>
            <StackSection />
          </ScrollReveal>
          <Separator />

          <ScrollReveal>
            <ExperienceSection />
          </ScrollReveal>
          <Separator />

          <ScrollReveal delay={0.05}>
            <EducationSection />
          </ScrollReveal>
          <Separator />

          <ScrollReveal>
            <ProjectsSection />
          </ScrollReveal>
          <Separator />

          {/* <ScrollReveal delay={0.05}>
            <BlogSection />
          </ScrollReveal>
          <Separator /> */}

          <ScrollReveal>
            <HonorsSection />
          </ScrollReveal>
          <Separator />

          <ScrollReveal delay={0.05}>
            <CertificationsSection />
          </ScrollReveal>
          <Separator />

          <ScrollReveal>
            <ContactSection />
          </ScrollReveal>
          <Separator />

          <Footer />
          <Separator />
        </div>
      </main>
    </>
  );
}
