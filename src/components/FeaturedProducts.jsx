"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// Placeholder featured products mapped to the new tracksuits/jackets theme
const featuredProducts = [
  {
    slug: "performance-tracksuit-pro",
    name: "Performance Tracksuit Pro",
    categorySlug: "tracksuits",
    image: "/category-tracksuit.png",
    tag: "Bestseller",
    description: "Moisture-wicking technical fabric with tailored fit."
  },
  {
    slug: "stealth-bomber-jacket",
    name: "Stealth Bomber Jacket",
    categorySlug: "jackets",
    image: "/category-jacket.png",
    tag: "New Arrival",
    description: "Insulated lightweight bomber with matte finish hardware."
  },
  {
    slug: "elite-team-kit",
    name: "Elite Team Kit",
    categorySlug: "team-uniforms",
    image: "/category-teamwear.png",
    tag: "Customizable",
    description: "Full sublimated matching kit for top-tier clubs."
  },
  {
    slug: "heavyweight-pullover-hoodie",
    name: "Heavyweight Pullover Hoodie",
    categorySlug: "hoodies",
    image: "/category-hoodie.png",
    tag: "Premium",
    description: "450gsm fleece cotton with structured hood."
  }
];

export default function FeaturedProducts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth auto-scroll effect
  useEffect(() => {
    let scrollInterval;
    if (!isHovered && scrollRef.current) {
      scrollInterval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += 1;
          if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 1)) {
            scrollRef.current.scrollLeft = 0;
          }
        }
      }, 25);
    }
    return () => clearInterval(scrollInterval);
  }, [isHovered]);

  return (
    <section className="relative overflow-hidden bg-white py-32 lg:py-48">
      
      {/* Massive Background Typography */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex whitespace-nowrap"
        >
           <span className="text-[20vw] font-black uppercase tracking-tighter text-transparent px-8" style={{ WebkitTextStroke: '2px #f5f5f5' }}>
            LATEST RELEASES — LATEST RELEASES — 
          </span>
          <span className="text-[20vw] font-black uppercase tracking-tighter text-transparent px-8" style={{ WebkitTextStroke: '2px #f5f5f5' }}>
            LATEST RELEASES — LATEST RELEASES — 
          </span>
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-16 relative z-10">
        
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10"
        >
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
              Discover
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
              Featured Build
            </h2>
          </div>
          
          <Link
            href="/categories"
            className="pb-1 border-b-2 border-black text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            View Full Catalog
          </Link>
        </motion.div>

        {/* Horizontal Smooth Scroll */}
        <div className="relative -mx-6 px-6 lg:-mx-16 lg:px-16">
          <div className="absolute left-0 top-0 bottom-0 w-8 lg:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 lg:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-12 pt-4 scrollbar-hide snap-x snap-mandatory"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {[...featuredProducts, ...featuredProducts].map((product, idx) => (
              <div
                key={`${product.slug}-${idx}`}
                className="group w-[85vw] sm:w-[500px] shrink-0 snap-center"
              >
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#fafafa]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-center transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
                    />
                    
                    {/* Tag Label */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-black shadow-none border border-black/10">
                        {product.tag}
                      </span>
                    </div>

                    {/* Dark Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
                  </div>

                  <div className="mt-6 flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight text-black transition-colors group-hover:text-[var(--color-primary)]">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#999]">
                        {product.categorySlug}
                      </p>
                    </div>
                    
                    <span className="border border-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black transition-all group-hover:bg-black group-hover:text-white">
                      Details
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
