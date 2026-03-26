import { LandingHero } from "@/components/landing/LandingHero";
import { FeaturedProjects } from "@/components/landing/FeaturedProjects";
import { TechStack } from "@/components/landing/TechStack";
import { SocialProof } from "@/components/landing/SocialProof";
import { BriefAbout } from "@/components/landing/BriefAbout";
import { CTAFooter } from "@/components/landing/CTAFooter";
import { ParticleField } from "@/components/landing/ParticleField";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="relative">
      {/* Full-page particle background */}
      <div className="fixed inset-0 -z-10">
        <ParticleField />
      </div>

      <LandingHero />
      <SocialProof />
      <FeaturedProjects />
      <TechStack />
      <BriefAbout />
      <CTAFooter />
    </main>
  );
}
