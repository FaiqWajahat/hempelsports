import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Banner from "@/components/Banner";
import Testimonials from "@/components/Testimonials";
import { getFeaturedProducts } from "@/data/catalog";
import { getProductCounts } from "@/lib/countUtils";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const counts = await getProductCounts();
  
  return (
    <>
      <Hero />
      <Categories counts={counts.categories} />
      <FeaturedProducts products={featuredProducts} />
      <Banner />
      
      <Testimonials />
    </>
  );
}
