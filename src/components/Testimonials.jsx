"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Hempel Sports completely transformed our team kit production. The attention to detail is world-class.",
    author: "James T.",
    role: "Alpine Athletics",
  },
  {
    quote: "We needed custom windbreakers with complex colorways. Hempel matched our specs perfectly on the first sample.",
    author: "Elena M.",
    role: "NordTrack Apparel",
  },
  {
    quote: "Scaling from 200 units to 5,000 pieces was seamless. Their production capacity made the process stress-free.",
    author: "Daniel K.",
    role: "Velo Sportswear",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="bg-white py-32 lg:py-48 overflow-hidden relative">
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-16 text-center">

        {/* Minimalist Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
            Partner Trust
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-black md:text-5xl">
            Reputation
          </h2>
        </motion.div>

        {/* Fading Single Quote Display */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          
          {/* Huge decorative quotation mark */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-5">
            <span className="text-[200px] font-serif leading-none text-black">"</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-4xl"
            >
              <p className="text-[clamp(1.5rem,4vw,3.5rem)] font-black uppercase tracking-tight leading-[1.1] text-black">
                {testimonials[activeIdx].quote}
              </p>

              <div className="mt-16 flex items-center justify-center gap-4">
                <div className="h-px w-8 bg-[var(--color-primary)]" />
                <div className="text-left">
                  <p className="text-sm font-bold uppercase tracking-widest text-black">
                    {testimonials[activeIdx].author}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999] mt-1">
                    {testimonials[activeIdx].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Nav Indicators */}
        <div className="mt-20 flex justify-center gap-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="group py-2 flex items-center justify-center relative"
            >
              <div 
                className={`transition-all duration-500 rounded-full ${activeIdx === i ? "w-12 h-1 bg-[var(--color-primary)]" : "w-4 h-1 bg-[#e0e0e0] group-hover:bg-[#ccc]"}`} 
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
