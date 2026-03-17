"use client";

import { motion } from "framer-motion";

export default function CategoriesHero() {
  return (
    <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-black pt-24 pb-16 lg:min-h-[60vh] lg:pt-32 lg:pb-20">
      
      {/* Absolute dark void background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-8 inline-block h-12 w-px bg-white/20" />
          <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-black uppercase tracking-tighter leading-[0.9] text-white">
            THE<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>
              ARCHIVE
            </span>
          </h1>
          <p className="mt-8 mx-auto max-w-lg text-sm font-medium leading-relaxed text-white/50">
            Explore our core manufacturing capabilities. From high-performance tracksuits to specialized outerwear, engineered for absolute excellence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
