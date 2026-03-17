"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (query.length < 2) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      const searchTerms = query.toLowerCase().split(" ");
      const found = [];

      categories.forEach((cat) => {
        cat.subcategories?.forEach((sub) => {
          sub.products?.forEach((product) => {
            const searchText = `${product.name} ${product.description} ${cat.name} ${sub.name}`.toLowerCase();
            const matchesAll = searchTerms.every(term => searchText.includes(term));
            
            if (matchesAll) {
              found.push({
                ...product,
                categorySlug: cat.slug,
                categoryName: cat.name,
                subcategorySlug: sub.slug
              });
            }
          });
        });
      });

      setResults(found.slice(0, 8));
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 right-0 top-0 z-[101] mx-auto w-full max-w-4xl p-4 sm:p-6 lg:mt-24"
          >
            <div className="flex flex-col overflow-hidden bg-white shadow-2xl rounded-none border border-black/10">
              
              {/* Header/Input Area */}
              <div className="relative flex items-center border-b border-[#f0f0f0] p-6 sm:p-8">
                <Search className="h-6 w-6 text-black/30" strokeWidth={1.5} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search tracksuits, jackets, hoodies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="mx-6 w-full bg-transparent text-xl font-medium tracking-tight text-black placeholder:text-black/30 placeholder:font-normal focus:outline-none sm:text-3xl"
                />
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5 text-black transition hover:bg-black/10"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                  <span className="sr-only">Close search</span>
                </button>
              </div>

              {/* Results Area */}
              <div className="max-h-[60vh] overflow-y-auto w-full">
                {isSearching ? (
                  <div className="flex h-48 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
                  </div>
                ) : query.length >= 2 ? (
                  results.length > 0 ? (
                    <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
                      {results.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/products/${product.slug}`}
                          onClick={onClose}
                          className="group flex items-center gap-6 border-b border-black/5 p-6 transition-colors hover:bg-[#fafafa]"
                        >
                          <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#f5f5f5]">
                            {product.image && (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                              />
                            )}
                          </div>
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#999] mb-1">
                              {product.categoryName}
                            </p>
                            <h4 className="text-sm font-bold uppercase tracking-tight text-black group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                              {product.name}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-48 flex-col items-center justify-center text-center px-6">
                      <p className="text-lg font-bold text-black uppercase tracking-tight mb-2">No results found</p>
                      <p className="text-sm text-zinc-500">
                        Try searching for &quot;tracksuit&quot;, &quot;fleece&quot;, or &quot;bomber jacket&quot;.
                      </p>
                    </div>
                  )
                ) : query.length > 0 ? (
                  <div className="flex h-32 items-center justify-center text-sm font-medium text-black/40">
                    Keep typing to search...
                  </div>
                ) : (
                  <div className="bg-[#fafafa] p-8">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999] mb-6">Popular Searches</h3>
                    <div className="flex flex-wrap gap-3">
                      {["Tracksuits", "Bomber Jackets", "Performance Hoodies", "Team Kits"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="border border-[#e0e0e0] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-black transition hover:border-black hover:bg-black hover:text-white"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
