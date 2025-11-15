/**
 * Homepage - Clean & Organized
 * 
 * All product sections are now grouped in HomeProductSections component
 * Edit product sections in: components/HomeProductSections.tsx
 */
import { CategoryMenu, Hero, Incentives, IntroducingSection, Newsletter } from "@/components";
import DealsCarousel from "@/components/DealsCarousel";
import HomeProductSections from "@/components/HomeProductSections";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <IntroducingSection />
      <Incentives />
      <CategoryMenu />
      <DealsCarousel />
      <HomeProductSections />
      <Newsletter />
    </main>
  );
}
