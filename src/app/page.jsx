import FeaturedProducts from "@/Component/FeaturedProduct";
import Hero from "@/Component/Hero";
import PromoBanner from "@/Component/PromoBanner";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Hero></Hero>
      <FeaturedProducts></FeaturedProducts>
      <PromoBanner></PromoBanner>
    </div>
  );
}
