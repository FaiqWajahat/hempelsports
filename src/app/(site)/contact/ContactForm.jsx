"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate API call for the mockup
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[500px] flex-col items-center justify-center rounded-[32px] bg-white p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-zinc-100"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-zinc-900">Inquiry Sent Successfully</h3>
        <p className="mt-4 max-w-sm text-zinc-500">
          Thank you for reaching out to Venpa Sports. One of our manufacturing specialists will contact you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-full border border-zinc-200 px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-zinc-600 transition-colors hover:bg-zinc-50"
        >
          Send Another
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="rounded-[32px] bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-zinc-100"
    >
      <h3 className="text-2xl font-bold text-zinc-900 mb-8">Send an Inquiry</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name & Company Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500">Full Name *</label>
            <input
              type="text"
              id="name"
              required
              className="w-full border-b border-black/20 bg-transparent py-4 text-sm font-medium text-black transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none placeholder:text-black/40"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="company" className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500">Company / Brand</label>
            <input
              type="text"
              id="company"
              className="w-full border-b border-black/20 bg-transparent py-4 text-sm font-medium text-black transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none placeholder:text-black/40"
              placeholder="Your Brand Name"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500">Email Address *</label>
            <input
              type="email"
              id="email"
              required
              className="w-full border-b border-black/20 bg-transparent py-4 text-sm font-medium text-black transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none placeholder:text-black/40"
              placeholder="john@company.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500">Phone / WhatsApp</label>
            <input
              type="tel"
              id="phone"
              className="w-full border-b border-black/20 bg-transparent py-4 text-sm font-medium text-black transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none placeholder:text-black/40"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        {/* Inquiry Type */}
        <div>
          <label htmlFor="type" className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500">Inquiry Type *</label>
          <div className="relative">
            <select
              id="type"
              required
              className="w-full appearance-none border-b border-black/20 bg-transparent py-4 text-sm font-medium text-black transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none"
            >
              <option value="">Select an option...</option>
              <option value="oem">OEM / Custom Manufacturing</option>
              <option value="bulk">Bulk Wholesale Order</option>
              <option value="sample">Sample Request</option>
              <option value="other">Other Inquiry</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500">Message / Details *</label>
          <textarea
            id="message"
            required
            rows={5}
            className="w-full resize-y border-b border-black/20 bg-transparent py-4 text-sm font-medium text-black transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none placeholder:text-black/40 min-h-[150px]"
            placeholder="Tell us about your project, estimated quantities, and specific product requirements..."
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group flex w-full items-center justify-center gap-2 bg-black py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[var(--color-primary)] disabled:opacity-70 disabled:hover:bg-black"
        >
          {status === "submitting" ? (
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            "Submit Inquiry"
          )}
        </button>
        
        <p className="text-center text-xs text-zinc-400 mt-4">
          By submitting, you agree to our Privacy Policy. We do not share your information.
        </p>

      </form>
    </motion.div>
  );
}
