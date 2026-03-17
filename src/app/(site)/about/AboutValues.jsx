"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const principles = [
  {
    number: "01",
    title: "Vertical Control",
    desc: "From yarn selection to final packing, we own the supply chain. This guarantees consistency and eliminates third-party delays."
  },
  {
    number: "02",
    title: "Technical Execution",
    desc: "Advanced pattern making, seam sealing, and sublimation printing. We execute complex tech packs flawlessly."
  },
  {
    number: "03",
    title: "Scalable Output",
    desc: "Whether you need 50 pieces for a capsule drop or 50,000 for a global retail rollout, our lines scale dynamically."
  },
  {
    number: "04",
    title: "Absolute Discretion",
    desc: "Your intellectual property is sacred. Strict NDA enforcement ensures your designs remain yours."
  }
];

export default function AboutValues() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-black py-32 lg:py-48 text-white relative flex justify-center w-full">
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-16 flex flex-col items-center">
        
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <span className="mb-6 inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
            Operating Protocol
          </span>
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase tracking-tighter leading-[0.9]">
            THE HEMPEL<br />ADVANTAGE.
          </h2>
        </motion.div>

        {/* Brutalist Grid */}
        <div className="grid grid-cols-1 gap-px bg-white/10 border border-white/10 w-full sm:grid-cols-2">
          {principles.map((p, idx) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black p-12 lg:p-16 flex flex-col justify-between group"
            >
              <div>
                <span className="text-xl font-serif italic text-white/30 group-hover:text-[var(--color-primary)] transition-colors">
                  {p.number}
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight mt-12 mb-6">
                  {p.title}
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-white/50">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
