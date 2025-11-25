import FeaturedProducts from "@/Component/FeaturedProduct";
import FeaturesSection from "@/Component/FeatureSections";
import Hero from "@/Component/Hero";
import PromoBanner from "@/Component/PromoBanner";
import TestimonialsSection from "@/Component/TestimonialSections";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Hero></Hero>
      <FeaturedProducts></FeaturedProducts>
      <FeaturesSection></FeaturesSection>
      <TestimonialsSection></TestimonialsSection>
      <PromoBanner></PromoBanner>
    </div>
  );
}
