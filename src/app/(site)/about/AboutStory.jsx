"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function AboutStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-white py-32 lg:py-48 mb-20">
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-16">
        
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-2 lg:gap-32 items-start">
          
          {/* Text Side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <p className="mb-12 text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
              Our Legacy
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase tracking-tighter leading-[0.9] text-black mb-12">
              BORN IN<br />SIALKOT.
            </h2>
            
            <div className="space-y-8 text-sm font-medium leading-relaxed text-[#555]">
              <p>
                Hempel Sports was founded on a singular principle: to bridge the gap between world-class brand visions and the reality of complex manufacturing. Located in Sialkot, Pakistan — the global epicenter of performance textiles — we operate a modern, vertically integrated studio.
              </p>
              <p>
                We don&apos;t just stitch fabrics. We engineer solutions. From developing custom technical fleece for heavyweight hoodies to precise sublimation for elite club tracksuits, our production lines are calibrated for absolute consistency.
              </p>
              <p>
                Over the past decade, Hempel has scaled from a boutique artisan workshop to a high-capacity export powerhouse, shipping premium sportswear to over 50 countries without compromising the meticulous craftsmanship that built our name.
              </p>
            </div>
            
            <div className="mt-16 pt-16 border-t border-black/10">
              <p className="text-xl font-black uppercase tracking-tight text-black">Precision at Scale.</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999] mt-2">Hempel Sports Directive</p>
            </div>
          </motion.div>

          {/* Image/Editorial Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[600px] lg:h-[800px] w-full bg-[#f5f5f5]"
          >
            <Image
              src="/hero-tracksuit.png"
              alt="Hempel Production Quality"
              fill
              className="object-cover object-center grayscale mix-blend-multiply opacity-80"
            />
            {/* Minimal overlays */}
            <div className="absolute inset-0 border border-black/10 m-4" />
            <div className="absolute bottom-10 left-10">
              <p className="text-[9px] font-bold uppercase tracking-widest text-black/40">Fig. 01</p>
              <p className="text-sm font-black uppercase text-black mt-1">Material Integrity</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
