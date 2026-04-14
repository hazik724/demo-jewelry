import CinematicTextSlider from "@/components/AnimatedTextSlider"
import CategoryHighlight from "@/components/categoryHighlights"
import FeaturedProducts from "@/components/featuredProducts"
import HeroCrousal from "@/components/heroCrousal"
import PremiumTextSlider from "@/components/PremiumTextSlider"
import TrustSection from "@/components/TrustSection"
import BgImage from "@/components/BgImage"

export default async function HomePage(
  ){
  return (
    <div>
  <HeroCrousal/>
  <CinematicTextSlider/>
  <TrustSection/>
  <FeaturedProducts/>
  <BgImage/>
  <PremiumTextSlider/>
  <CategoryHighlight/>
  <FeaturedProducts/>

    </div>
  )
}