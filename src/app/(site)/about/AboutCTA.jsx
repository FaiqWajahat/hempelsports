"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-black py-40 flex justify-center w-full mt-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-16 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span className="mb-8 inline-block h-24 w-px bg-white/20" />
          
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter leading-[0.9] text-white">
            INITIATE<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>
              PRODUCTION
            </span>
          </h2>
          
          <p className="mt-8 max-w-md text-sm font-medium leading-relaxed text-white/50">
            Submit your tech packs, request a sample, or consult with our manufacturing experts to scale your next collection.
          </p>
          
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/quote"
              className="w-full sm:w-auto bg-white px-10 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-transform hover:scale-105"
            >
              Request Quote
            </Link>
            <Link
              href="/categories"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-[var(--color-primary)]"
            >
              View Catalog
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-all group-hover:border-[var(--color-primary)]">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
