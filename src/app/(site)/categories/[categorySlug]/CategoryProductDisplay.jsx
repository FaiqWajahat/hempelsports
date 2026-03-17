"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CategoryProductDisplay({
  category,
  categorySlug,
  subcategories,
  initialSubSlug,
  products = [],
}) {
  const allSubcategories = [
    { slug: "all", name: "All" },
    ...subcategories,
  ];

  const safeInitialSubSlug = initialSubSlug || "all";
  const hasInitial = allSubcategories.some((sub) => sub.slug === safeInitialSubSlug);
  const [activeSubSlug, setActiveSubSlug] = useState(
    hasInitial ? safeInitialSubSlug : "all",
  );

  const filteredProducts = products;

  const activeSubLabel =
    activeSubSlug === "all"
      ? "All"
      : allSubcategories.find((sub) => sub.slug === activeSubSlug)?.name || "All";

  return (
    <div className="bg-[#F9F9F9] min-h-screen pb-24">


      <section className="relative overflow-hidden bg-black pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={category.heroImage}
            alt={category.name}
            fill
            priority
            className="object-cover object-center grayscale mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-16 relative z-10 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
              Category
            </span>
            <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-black uppercase tracking-tighter leading-[0.9] text-white">
              {category.name}
            </h1>
            <p className="mt-6 text-sm font-medium leading-relaxed text-white/50 max-w-xl mx-auto lg:mx-0">
              {category.shortDescription || category.description}
            </p>
          </motion.div>

          {/* Subcategory Filter Pills (Desktop aligned right, Mobile centered below) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center lg:justify-end gap-3"
          >
            {allSubcategories.map((sub) => {
              const href =
                sub.slug === "all"
                  ? `/categories/${categorySlug}/all`
                  : `/categories/${categorySlug}/${sub.slug}`;

              return (
                <Link
                  key={sub.slug}
                  href={href}
                  className={`border px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all block ${
                      activeSubSlug === sub.slug
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-white/20 bg-transparent text-white hover:border-white/50"
                    }`}
                >
                  {sub.name}
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>
      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-16 mt-8">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name, href: `/categories/${categorySlug}` },
          { label: activeSubLabel }
        ]} />
      </div>

      {/* Product Grid Area */}
      <section className="mx-auto w-full max-w-[1600px] px-6 lg:px-16 pt-12 lg:pt-16">

        {/* Results count indicator */}
        <div className="mb-12 border-b border-black/10 pb-6 flex items-end justify-between">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase tracking-tighter text-black">
            {activeSubLabel === "All" ? "Archive" : activeSubLabel}
          </h2>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999]">
            {filteredProducts.length} Specifications
          </span>
        </div>

        {/* Animated Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                {/* Reusing the ProductCard component we already built */}
                <ProductCard product={{ ...product, category: category.name }} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-32 text-center"
            >
              <h3 className="text-4xl font-black uppercase tracking-tighter text-black">NO ENTRIES FOUND</h3>
              <p className="text-[#999] mt-4 text-sm font-medium">
                The {activeSubLabel} archive is currently empty or updating.
              </p>
              <button
                onClick={() => setActiveSubSlug("all")}
                className="mt-8 border border-black bg-black px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-transparent hover:text-black"
              >
                Return to Archive
              </button>
            </motion.div>
          )}
        </motion.div>

      </section>
    </div>
  );
}
