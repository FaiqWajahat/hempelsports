"use client";

import { motion } from "framer-motion";

export default function FeaturedProductsSkeleton() {
  // Skeleton version of the product cards
  const SkeletonCard = () => (
    <div className="w-[85vw] sm:w-[500px] shrink-0 animate-pulse">
      <div className="relative aspect-[4/5] w-full bg-zinc-100 overflow-hidden" />
      <div className="mt-6 flex justify-between items-start">
        <div className="flex-1">
          <div className="h-6 w-3/4 bg-zinc-100 mb-2" />
          <div className="h-4 w-1/4 bg-zinc-100" />
        </div>
        <div className="h-8 w-20 bg-zinc-100" />
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-white py-32 lg:py-48">
      {/* Massive Background Typography Skeleton */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden flex whitespace-nowrap opacity-10">
        <div className="flex whitespace-nowrap">
           <span className="text-[20vw] font-black uppercase tracking-tighter text-transparent px-8" style={{ WebkitTextStroke: '2px #f5f5f5' }}>
            LOADING — LOADING — 
          </span>
           <span className="text-[20vw] font-black uppercase tracking-tighter text-transparent px-8" style={{ WebkitTextStroke: '2px #f5f5f5' }}>
            LOADING — LOADING — 
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-16 relative z-10">
        {/* Header Skeleton */}
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
          <div>
            <div className="mb-4 h-3 w-24 bg-zinc-100" />
            <div className="h-12 md:h-16 w-64 md:w-96 bg-zinc-100" />
          </div>
          <div className="h-4 w-32 bg-zinc-100" />
        </div>

        {/* Horizontal Scroll Skeleton */}
        <div className="relative -mx-6 px-6 lg:-mx-16 lg:px-16 overflow-hidden">
          <div className="flex gap-8 pb-12 pt-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    </section>
  );
}
