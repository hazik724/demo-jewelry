import CinematicTextSlider from "@/components/AnimatedTextSlider"
import CategoryHighlight from "@/components/categoryHighlights"
import FeaturedProducts from "@/components/featuredProducts"
import HeroCrousal from "@/components/heroCrousal"
import PremiumTextSlider from "@/components/PremiumTextSlider"

export default async function HomePage(
  ){
  return (
    <div>
  <HeroCrousal/>
  <CinematicTextSlider/>
  <FeaturedProducts/>
  <PremiumTextSlider/>
  <CategoryHighlight/>
  <FeaturedProducts/>

    </div>
  )
}