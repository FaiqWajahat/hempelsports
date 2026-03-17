"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is your Minimum Order Quantity (MOQ)?",
    a: "Our standard MOQ is 100 units per style (can be split across sizes). For specialized technical outerwear, MOQs may vary based on fabric minimums. We prioritize long-term production partnerships over one-off sampling."
  },
  {
    q: "Do you offer custom tech pack development?",
    a: "Yes. Our in-house pattern masters and technical designers can translate your sketches or reference garments into production-ready tech packs, including grading and fabric sourcing."
  },
  {
    q: "What are your standard production lead times?",
    a: "Sampling typically requires 2-3 weeks from tech pack approval. Bulk production ranges from 4-6 weeks depending on quantity, fabric complexity, and current facility capacity."
  },
  {
    q: "How do you handle shipping and logistics?",
    a: "We ship globally via air freight (DHL/FedEx for speed, 4-7 days) or sea freight (for volume, 25-40 days). All shipments are fully insured and tracked door-to-door."
  },
  {
    q: "Can you source sustainable or recycled fabrics?",
    a: "Absolutely. We have established relationships with mills producing certified recycled polyesters, organic cotton blends, and eco-friendly DWR treatments for tracksuits and jackets."
  }
];

export default function ContactFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="flex flex-col mb-32 border-t border-black pt-16 mt-16">
      <div className="mb-16 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div>
           <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
            Logistics & Protocol
          </p>
          <h2 className="text-[clamp(3.5rem,6vw,5rem)] leading-[0.9] font-black uppercase tracking-tighter text-black">
            FAQ<span className="text-[var(--color-primary)]">.</span>
          </h2>
        </div>
        <div className="max-w-sm text-xs font-bold uppercase tracking-[0.2em] text-[#999] lg:text-right">
          Standard Operating Procedures for Global Manufacturing Clients
        </div>
      </div>

      <div className="flex flex-col border-t-2 border-black">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          const num = String(idx + 1).padStart(2, "0");
          return (
            <div
              key={idx}
              className={`group border-b border-black transition-all duration-700 ease-[0.16,1,0.3,1] ${
                isOpen ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-black/5'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="flex w-full items-center justify-between py-8 md:py-12 px-6 lg:px-12"
              >
                <div className="flex items-center gap-8 md:gap-16">
                  <span className={`text-xl md:text-3xl font-black font-mono tracking-tighter transition-colors duration-500 ${
                    isOpen ? 'text-[var(--color-primary)]' : 'text-black/20 group-hover:text-[var(--color-primary)]'
                  }`}>
                    {num}
                  </span>
                  <span className={`text-[clamp(1.5rem,3vw,3rem)] text-left font-black uppercase tracking-tighter leading-[1.1] transition-colors duration-500 ${
                    isOpen ? 'text-white' : 'text-black'
                  }`}>
                    {faq.q}
                  </span>
                </div>
                <span className={`ml-6 flex shrink-0 items-center justify-center p-3 md:p-4 rounded-full border transition-all duration-700 ease-[0.16,1,0.3,1] ${
                  isOpen 
                    ? 'rotate-[135deg] border-white/20 bg-white text-black scale-110' 
                    : 'border-black/20 text-black group-hover:bg-black group-hover:text-white group-hover:scale-110'
                }`}>
                  <Plus className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.5} />
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-16 pt-4 px-6 lg:px-12 md:pl-[8.5rem] lg:pl-[11rem]">
                      <div className="lg:w-3/4">
                        <p className="text-sm md:text-lg font-medium leading-relaxed text-white/70 border-l-2 border-[var(--color-primary)] pl-8">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
