"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ProductDetailDisplay({ product }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="bg-white min-h-screen">

      {/* Dark Hero Section to support the transparent navbar */}
      <section className="relative overflow-hidden bg-black pt-32 pb-12 lg:pt-40 lg:pb-16 flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl px-5 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-black uppercase tracking-tighter leading-[0.9] text-white">
            {product.name}
          </h1>
        </div>
      </section>

      {/* Dark Breadcrumbs */}
      <div className="bg-black">
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: (product.categorySlug.charAt(0).toUpperCase() + product.categorySlug.slice(1)).replace(/-/g, ' '), href: `/categories/${product.categorySlug}` },
            { label: product.name }
          ]} 
          isDark={true}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-square w-full overflow-hidden bg-[#f5f5f5]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                    <Image
                      src={product.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23e4e4e7' width='400' height='400'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='14' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ENo image%3C/text%3E%3C/svg%3E"}
                      alt={`${product.name} view ${activeImage + 1}`}
                      fill
                      priority
                      className="object-cover object-center"
                    />
                </motion.div>
              </AnimatePresence>
            </motion.div>

          
          </div>

          {/* Right Column: Product Details & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Badges / Meta */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {product.isNew && (
                <span className="border border-[var(--color-primary)] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  New Arrival
                </span>
              )}
              {product.isBestseller && (
                <span className="border border-black bg-black px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                  Bestseller
                </span>
              )}
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#999] uppercase ml-auto">
                SKU: {product.sku}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-black uppercase tracking-tighter leading-[0.9] text-black mb-6">
              {product.name}
            </h1>

            {/* Subcategory */}
            <p className="border-b border-black/10 pb-6 mb-8 text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
              {product.subCategory}
            </p>

            {/* Description */}
            <div className="text-sm font-medium leading-relaxed text-[#555] mb-12">
              <p className="mb-6">
                {product.name} represents the pinnacle of our manufacturing capabilities.
                Using strictly premium materials and rigorously tested construction patterns,
                this model is completely customizable for your commercial brand.
              </p>
              <ul className="space-y-4 border-l-2 border-[var(--color-primary)] pl-6">
                <li><strong className="text-black uppercase tracking-widest text-[10px]">Customization:</strong><br />Full private label available (logo, colors, material)</li>
                <li><strong className="text-black uppercase tracking-widest text-[10px]">Sample Time:</strong><br />7-10 Business Days</li>
                <li><strong className="text-black uppercase tracking-widest text-[10px]">Production Time:</strong><br />3-4 Weeks standard</li>
              </ul>
            </div>

            {/* B2B Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-black/10">
              <Link
                href={`/quote?product=${product.sku}`}
                className="flex-1 flex items-center justify-center gap-2 border border-black bg-black px-6 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-transparent hover:text-black"
              >
                Request Proposal
              </Link>

              <a
                href={`https://wa.me/923226798594?text=Hello,%20I%20am%20interested%20in%20manufacturing%20the%20${product.name}%20(SKU:%20${product.sku}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-[0.3] flex flex-col items-center justify-center border border-black/20 bg-transparent py-5 text-black transition-colors hover:border-black hover:bg-black hover:text-white"
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] mb-1">Direct Line</span>
                <span className="text-xs font-black">WhatsApp</span>
              </a>
            </div>

            <p className="mt-8 text-[9px] font-bold uppercase tracking-widest text-[#999] text-center border-t border-black/5 pt-4">
              SECURE B2B COMMUNICATIONS. NDA PROTOCOLS ENFORCED.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
