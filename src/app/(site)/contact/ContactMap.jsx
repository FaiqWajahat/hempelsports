"use client";

import { motion } from "framer-motion";

export default function ContactMap() {
  return (
    <section className="bg-zinc-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        
        <div className="mb-12 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              Our Location
            </h2>
            <p className="mt-4 text-base text-zinc-500 max-w-2xl mx-auto lg:mx-0">
              Our headquarters are located in Okara, Pakistan. We welcome business partners to visit our office by appointment to discuss custom manufacturing projects.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[400px] sm:h-[500px] w-full overflow-hidden rounded-[32px] shadow-lg border border-zinc-200"
        >
          <iframe 
            src="https://maps.google.com/maps?q=House+No.30+Street+No.01+X-Block+Government+Colony+Okara,+Pakistan&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Hempel Sports Location, Okara"
            className="grayscale contrast-125 opacity-90 transition-all hover:grayscale-0 hover:opacity-100 duration-700"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
}
