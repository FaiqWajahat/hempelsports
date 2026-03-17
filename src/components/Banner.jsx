"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Banner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black py-32 lg:py-48">
      
      {/* Background purely abstract/minimalist */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="/hero-jacket.png"
          alt="Hempel Sports"
          fill
          className="object-cover object-center grayscale mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-start px-6 lg:px-16">
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-16"
        >
          {/* Left Large Statement */}
          <div className="max-w-2xl">
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tighter leading-[0.9] text-white">
              MANUFACTURED<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>
                WITHOUT
              </span><br />
              COMPROMISE.
            </h2>
          </div>

          {/* Right Copy */}
          <div className="max-w-sm shrink-0 border-l border-[var(--color-primary)] pl-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4">
              The Hempel Standard
            </p>
            <p className="text-sm leading-relaxed text-white/60">
              End-to-end B2B sportswear production. From technical fabric sourcing to precise finishings and bespoke packaging. Elevating brands across 50+ countries.
            </p>
            
            {/* Minimalist Stats Grid */}
            <div className="mt-12 grid grid-cols-2 gap-y-8 gap-x-4">
              <div>
                <p className="text-xl font-bold text-white mb-1 tracking-tight">10+ Yrs</p>
                <p className="text-[9px] uppercase tracking-widest text-[#555]">Experience</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white mb-1 tracking-tight">50+</p>
                <p className="text-[9px] uppercase tracking-widest text-[#555]">Countries</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white mb-1 tracking-tight">1M+</p>
                <p className="text-[9px] uppercase tracking-widest text-[#555]">Units/Year</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[var(--color-primary)] mb-1 tracking-tight">0%</p>
                <p className="text-[9px] uppercase tracking-widest text-[#555]">Defects</p>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
