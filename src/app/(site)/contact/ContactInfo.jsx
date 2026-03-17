"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

const contactDetails = [
  {
    icon: <MapPin className="h-6 w-6" strokeWidth={1.5} />,
    title: "Global Headquarters",
    value: "Hempel Studios",
    subtext: "MOH. SHARIF PURA, P.O KHAS\nUGOKI, SIALKOT, Pakistan",
    href: null
  },
  {
    icon: <Mail className="h-6 w-6" strokeWidth={1.5} />,
    title: "Direct Email",
    value: "info@hempelsports.com",
    subtext: "B2B Production Inquiries\nGuaranteed 24h response",
    href: "mailto:info@hempelsports.com"
  },
  {
    icon: <Phone className="h-6 w-6" strokeWidth={1.5} />,
    title: "Phone / WhatsApp",
    value: "+92 322 6798594",
    subtext: "Global Communications\nMon-Sat, 9am - 6pm (PKT)",
    href: "tel:+923226798594"
  }
];

export default function ContactInfo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="flex flex-col mb-32">
      
      <div className="mb-20 text-center flex flex-col items-center">
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
              Direct Access
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black uppercase tracking-tighter leading-[1] text-black">
              ZERO. MIDDLEMEN.
            </h2>
            <p className="mt-6 text-sm font-medium leading-relaxed text-[#666]">
              By contacting Hempel Sports, you bypass agencies and connect straight to the production architects.
            </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 border border-black/10 bg-[#fafafa]">
        {contactDetails.map((detail, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col p-12 lg:p-16 transition-colors hover:bg-white"
          >
            <div className="mb-10 text-black/20 transition-colors group-hover:text-[var(--color-primary)]">
              {detail.icon}
            </div>
            
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">{detail.title}</h3>
            
            {detail.href ? (
              <a href={detail.href} className="mb-6 text-xl font-black tracking-tight text-black transition-colors hover:text-[var(--color-primary)]">
                {detail.value}
              </a>
            ) : (
              <p className="mb-6 text-xl font-black tracking-tight text-black">{detail.value}</p>
            )}

            <p className="text-xs font-medium leading-relaxed text-[#666] whitespace-pre-line">
              {detail.subtext}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
