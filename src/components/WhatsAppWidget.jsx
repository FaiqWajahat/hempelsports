"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppWidget() {
  const phoneNumber = "923226798594";
  const defaultMessage = "Hi Hempel Sports, I'm interested in your manufacturing services for tracksuits and jackets. Can we discuss a project?";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    defaultMessage,
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-none bg-black text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[var(--color-primary)] sm:bottom-8 sm:right-8 lg:h-16 lg:w-16"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 lg:h-8 lg:w-8" strokeWidth={1.5} />
      
      {/* Tooltip effect */}
      <span className="absolute right-full mr-4 whitespace-nowrap bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black opacity-0 shadow-lg transition-all duration-300 group-hover:-translate-x-2 group-hover:opacity-100 border border-black/10">
        Direct Factory Contact
      </span>
    </motion.a>
  );
}
