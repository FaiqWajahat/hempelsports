"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { categories } from "@/data/categories";

function CategoryCard({ cat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={`group relative h-[400px] sm:h-[500px] lg:h-[600px] ${cat.colSpan}`}
    >
      <Link href={`/categories/${cat.slug}`} className="block h-full w-full bg-[#f5f5f5]">
        <div className="relative h-full w-full overflow-hidden">

          {/* Image */}
          <div className="absolute inset-0 z-0">
            {/* Swapped to standard img tag to bypass next.config.js remote patterns error */}
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105 grayscale mix-blend-multiply opacity-80"
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
          </div>

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-8 sm:p-12 flex flex-col justify-end h-full">
            <div className="transform transition-transform duration-500 group-hover:-translate-y-2">

              {/* Product Count Badge */}
              <div className="mb-4 inline-flex items-center gap-2 border border-white/20 px-4 py-2 bg-black/40 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{cat.count}</span>
              </div>

              {/* Title & Description */}
              <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-black uppercase tracking-tighter leading-[0.9] text-white mb-4">{cat.name}</h2>
              <p className="max-w-md text-sm font-medium leading-relaxed text-white/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 hidden sm:block">
                {cat.description}
              </p>

              {/* Tags (Subcategories) */}
              <div className="mt-6 flex flex-wrap gap-2 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100 hidden sm:flex">
                {cat.tags.map((tag) => (
                  <span key={tag} className="border border-white/20 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow CTA */}
              <div className="absolute bottom-8 right-8 flex h-16 w-16 items-center justify-center bg-white text-black transition-transform duration-500 group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:scale-105">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>

            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  );
}

export default function CategoriesGrid({ counts = {} }) {
  return (
    <section className="bg-white py-20 lg:py-32 relative">
      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-16">

        {/* B2B Masonry Grid */}
        <div className="grid grid-cols-1 gap-px bg-black border border-black md:grid-cols-2 lg:grid-cols-3">
          {categories
            .filter((cat) => cat.isActive)
            .map((cat, index) => (
              <CategoryCard
                key={cat.id}
                cat={{
                  ...cat,
                  image: cat.tileImage,
                  count: counts[cat.slug] !== undefined ? `${counts[cat.slug]} Products` : cat.productCountLabel,
                }}
                index={index}
              />
            ))}
        </div>

      </div>
    </section>
  );
}