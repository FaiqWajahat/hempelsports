"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const benefits = [
  {
    title: "Exact Sourcing",
    desc: "We analyze your tech pack to source the exact GSM weight, weave, and composition required."
  },
  {
    title: "Prototyping",
    desc: "Rapid sampling phase allows for 3D fit testing and material validation before bulk commitments."
  },
  {
    title: "Volume Efficiency",
    desc: "Transparent tiered pricing structure. As your volume scales, unit economics improve dramatically."
  },
  {
    title: "Quality Assurance",
    desc: "Inline and end-of-line inspections ensure the 10,000th piece matches the approved sample perfectly."
  }
];

export default function QuoteBenefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="flex flex-col mt-20 lg:mt-0">
      
      <div className="mb-16">
        <motion.div
           ref={ref}
           initial={{ opacity: 0, x: -30 }}
           animate={inView ? { opacity: 1, x: 0 } : {}}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
            Hempel Protocol
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-black">
            Why Request<br />A Formal Quote?
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col gap-12">
        {benefits.map((b, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group flex gap-6"
          >
            <div className="text-[10px] font-bold text-[#aaa] mt-1 shrink-0">
               {String(idx + 1).padStart(2, '0')}
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-black mb-2 transition-colors group-hover:text-[var(--color-primary)]">
                {b.title}
              </h3>
              <p className="text-sm font-medium leading-relaxed text-[#666]">
                {b.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Editorial Image Block */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-16 w-full relative aspect-square bg-[#f5f5f5] overflow-hidden"
      >
        <Image 
          src="/hero-teamwear.png"
          alt="Technical Manufacturing"
          fill
          className="object-cover grayscale mix-blend-multiply opacity-70"
        />
        <div className="absolute inset-0 border border-black/10 m-4" />
      </motion.div>

    </div>
  );
}
