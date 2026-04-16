import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProductsLoader from "@/components/FeaturedProductsLoader";
import FeaturedProductsSkeleton from "@/components/FeaturedProductsSkeleton";
import Banner from "@/components/Banner";
import Testimonials from "@/components/Testimonials";
import { getProductCounts } from "@/lib/countUtils";
import { Suspense } from "react";

export default async function Home() {
  const counts = await getProductCounts();
  
  return (
    <>
      <Hero />
      <Categories counts={counts.categories} />
      
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProductsLoader />
      </Suspense>

      <Banner />
      
      <Testimonials />
    </>
  );
}
