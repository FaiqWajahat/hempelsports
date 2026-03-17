"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { categories } from "@/data/categories";

export default function Categories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Only show active categories
  const displayCategories = categories.filter((cat) => cat.isActive).slice(0, 4);

  return (
    <section className="bg-white py-32 lg:py-48">
      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-16">

        {/* Header - Editorial Split */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
              Core Manufacturing
            </p>
            <h2 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter leading-[0.9] text-black">
              OUR<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>
                EXPERTISE.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-sm"
          >
            <p className="text-sm font-medium leading-relaxed text-[#666]">
              From technical performance wear to lifestyle outerwear. We engineer products that define modern athletic brands.
            </p>
            <Link
              href="/categories"
              className="mt-8 inline-block border-b-2 border-black pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:pl-2"
            >
              View Full Collection
            </Link>
          </motion.div>
        </div>

        {/* Asymmetrical Grid / Masonry feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          {displayCategories.map((category, idx) => {
            // Stagger alignment to create an editorial flow
            const isEven = idx % 2 === 0;
            const marginTop = idx === 1 ? 'md:mt-32' : idx === 3 ? 'md:mt-32' : '';

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`group flex flex-col ${marginTop} ${isEven ? 'md:pr-12' : 'md:pl-12'}`}
              >
                <Link href={`/categories/${category.slug}`} className="relative block overflow-hidden bg-[#f5f5f5]">
                  {/* Aspect Ratio Container */}
                  <div className="relative aspect-[4/5] w-full origin-bottom transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.02]">
                    {category.tileImage && (
                      <Image
                        src={category.tileImage}
                        alt={category.name}
                        fill
                        className="object-cover object-center transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
                      />
                    )}

                    {/* Dark overlay specifically for hover */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                  </div>
                </Link>

                <div className="mt-8 flex flex-col">
                  <div className="flex items-baseline justify-between mb-4 border-b border-black pb-4">
                    <h3 className="text-4xl font-black uppercase tracking-tighter text-black transition-colors group-hover:text-[var(--color-primary)]">
                      {category.name}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <p className="text-sm font-medium leading-relaxed text-[#666] line-clamp-2 pr-12">
                    {category.shortDescription}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3 text-[var(--colour-primary)]">
                    {category.tags?.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold uppercase tracking-widest text-[#999]"
                      >
                        {tag} {i < category.tags.slice(0, 3).length - 1 && '—'}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
