"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { categories as siteCategories } from "@/data/categories";

export default function QuoteForm() {
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const searchParams = useSearchParams();
  const productSkuParam = searchParams.get("product");

  const quoteCategories = siteCategories
    .filter((cat) => cat.isActive && cat.quoteLabel)
    .map((cat) => ({
      label: cat.quoteLabel,
      value: cat.slug,
    }));

  const handleCategoryToggle = (catValue) => {
    if (selectedCategories.includes(catValue)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== catValue));
    } else {
      setSelectedCategories([...selectedCategories, catValue]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get("fullName"),
      companyName: formData.get("companyName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      quantity: formData.get("quantity"),
      deliveryDate: formData.get("deliveryDate"),
      projectDescription: formData.get("projectDescription"),
      categories: selectedCategories,
      productSku: productSkuParam, // Include SKU if they came from a product page
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send quote request. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[600px] flex-col items-center justify-center rounded-[32px] bg-white p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-zinc-100"
      >
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-green-500">
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-3xl font-black text-zinc-900 tracking-tight">Quotation Sent!</h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-500">
          Your quotation has been sent successfully, and we will respond to you shortly. Thank you for choosing Venpa Sports.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-10 rounded-xl bg-zinc-900 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[var(--color-primary)] hover:shadow-lg"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white p-6 sm:p-10 lg:p-16 border-t border-black/10"
    >
      <div className="mb-16 border-b border-black pb-8">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
            Manufacturing Proposal
        </p>
        <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-black uppercase tracking-tighter leading-[0.9] text-black">
          COMPREHENSIVE<br />
          QUOTE REQUEST.
        </h2>
        <p className="mt-6 text-sm font-medium leading-relaxed text-[#666]">Please provide exact technical details to ensure an accurate quote.</p>
        
        {productSkuParam && (
           <div className="mt-8 inline-flex items-center gap-2 border border-[var(--color-primary)] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
             </svg>
             REFERENCE SKU: {productSkuParam}
           </div>
        )}
      </div>

      {status === "error" && (
        <div className="mb-12 border border-red-500 bg-red-50 p-6 text-[11px] font-bold uppercase tracking-widest text-red-600 flex items-center gap-4">
          <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* SECTION 1: Contact Info */}
        <section>
          <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
              01. Client Data
            </h3>
          </div>
          
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#999]">Full Name</label>
              <input type="text" name="fullName" required className="w-full border-b border-black/20 bg-transparent py-4 text-sm font-medium text-black transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none placeholder:text-black/30" placeholder="John Doe" />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#999]">Company / Brand Name</label>
              <input type="text" name="companyName" className="w-full border-b border-black/20 bg-transparent py-4 text-sm font-medium text-black transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none placeholder:text-black/30" placeholder="Your Brand LLC" />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#999]">Email Address</label>
              <input type="email" name="email" required className="w-full border-b border-black/20 bg-transparent py-4 text-sm font-medium text-black transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none placeholder:text-black/30" placeholder="john@company.com" />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#999]">Phone / WhatsApp</label>
              <input type="tel" name="phone" required className="w-full border-b border-black/20 bg-transparent py-4 text-sm font-medium text-black transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none placeholder:text-black/30" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#999]">Shipping Country</label>
              <select name="country" required className="w-full appearance-none border-b border-black/20 bg-transparent py-4 text-sm font-medium text-black transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none">
                <option value="">Select a country...</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="CA">Canada</option>
                <option value="EU">Europe (EU)</option>
                <option value="OTHER">Other / Global</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECTION 2: Project Details */}
        <section>
          <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
              02. Project Scope
            </h3>
          </div>
          
          <label className="mb-4 block text-[10px] font-bold uppercase tracking-widest text-[#999]">Product Categories</label>
          <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {quoteCategories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => handleCategoryToggle(cat.value)}
                className={`relative flex items-center justify-center p-4 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  selectedCategories.includes(cat.value)
                    ? "border border-black bg-black text-white" 
                    : "border border-black/10 bg-transparent text-black hover:border-black/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#999]">Estimated Quantity</label>
              <select name="quantity" className="w-full appearance-none border-b border-black/20 bg-transparent py-4 text-sm font-medium text-black transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none">
                <option value="">Select range...</option>
                <option value="50-100">50 - 100 Pieces (Trial)</option>
                <option value="100-500">100 - 500 Pieces</option>
                <option value="500-2000">500 - 2,000 Pieces</option>
                <option value="2000+">2,000+ Pieces (Container)</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#999]">Target Delivery Date</label>
              <input name="deliveryDate" type="month" className="w-full border-b border-black/20 bg-transparent py-4 text-sm uppercase text-black font-medium transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none" />
            </div>
          </div>
        </section>

        {/* SECTION 3: Technical Details */}
        <section>
          <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
              03. Specifications
            </h3>
          </div>
          
          <div className="mb-6">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#999]">Project Description</label>
            <textarea
              name="projectDescription"
              required
              rows={5}
              className="w-full resize-y border-b border-black/20 bg-transparent py-4 text-sm font-medium text-black transition-all hover:border-black focus:border-[var(--color-primary)] focus:outline-none placeholder:text-black/30 min-h-[150px]"
              placeholder="Describe your ideal materials (e.g., 400gsm fleece, lightweight poly), branding requirements (embroidery, sublimation), and any specific tech pack details..."
            ></textarea>
          </div>
        </section>

        {/* Submit */}
        <div className="pt-16 border-t border-black/10">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group flex w-full sm:w-auto min-w-[300px] h-16 items-center justify-center bg-black px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[var(--color-primary)] disabled:opacity-70 disabled:hover:bg-black"
          >
            {status === "submitting" ? (
               "PROCESSING..."
            ) : (
                "SUBMIT PROPOSAL"
            )}
          </button>
          <p className="text-xs text-[#999] mt-8 max-w-sm uppercase tracking-widest font-bold font-mono">
            SECURE B2B PORTAL. NDA ENFORCED.
          </p>
        </div>

      </form>
    </motion.div>
  );
}
