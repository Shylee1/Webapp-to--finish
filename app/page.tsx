import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero"
import { FeaturesSection } from "@/components/sections/features"
import { ShowcaseSection } from "@/components/sections/showcase"
import { PricingPreviewSection } from "@/components/sections/pricing-preview"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { NewsPreviewSection } from "@/components/sections/news-preview"
import { CTASection } from "@/components/sections/cta"

export default function Home() {
  return (
    <main className="relative bg-black">
      {/* Noise Overlay */}
      <div className="noise fixed inset-0 pointer-events-none z-50" />
      
      <Navigation />
      
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <PricingPreviewSection />
      <TestimonialsSection />
      <NewsPreviewSection />
      <CTASection />
      
      <Footer />
    </main>
  )
}
