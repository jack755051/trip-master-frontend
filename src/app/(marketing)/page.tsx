import HeroSection from "@/src/components/sections/home/hero/hero-section";
import TrendingSection from "@/src/components/sections/home/trending-section";
import FeatureSection from "@/src/components/sections/home/feature-section";
import CtaSection from "@/src/components/sections/home/cta-section";

export default function Home() {
  return (
    <div className="home__container flex flex-col w-full min-w-screen">
      <HeroSection></HeroSection>
      <TrendingSection></TrendingSection>
      <FeatureSection></FeatureSection>
      <CtaSection></CtaSection>
    </div>
  );
}
