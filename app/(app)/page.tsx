import CinematicTextSlider from "@/components/AnimatedTextSlider"
import CategoryHighlight from "@/components/categoryHighlights"
import FeaturedProducts from "@/components/featuredProducts"
import HeroCrousal from "@/components/heroCrousal"
import PremiumTextSlider from "@/components/PremiumTextSlider"
import TrustSection from "@/components/TrustSection"
import BgImage from "@/components/BgImage"
import CategoryLinks from "@/components/CategoryLink"
import DeliveryText from "@/components/deliverytext"
import CategoryTeaser from "@/components/CategoryTeaser"

export default async function HomePage(
  ){
    
  return (
    <div>
  <HeroCrousal/>
  <CinematicTextSlider/>
  <CategoryTeaser/>
  <TrustSection/>
  <FeaturedProducts/>
  <CategoryHighlight/>
  <PremiumTextSlider/>
  <BgImage/>
  <DeliveryText/>
  <FeaturedProducts/>
  <CategoryLinks  />

    </div>
  )
}