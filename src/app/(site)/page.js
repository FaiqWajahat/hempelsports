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
      {/* <Hero />
      <Categories counts={counts.categories} />

      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProductsLoader />
      </Suspense>

      <Banner />

      <Testimonials /> */}

      <div className="h-screen flex items-center justify-center bg-black text-white text-[ clamp(2.5rem,6vw,4.5rem)] font-black uppercase tracking-tighter leading-[0.9]">
        <h2 className="text-red-600 text-5xl lg:text-9xl font-bold">
          Site is down{" "}
        </h2>
      </div>
    </>
  );
}
