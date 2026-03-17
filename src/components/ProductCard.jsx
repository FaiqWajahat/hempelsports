"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProductCard({
  product,
  categorySlug,
  subcategorySlug
}) {
  const href = `/products/${product.slug}`;

  return (
    <div className="group flex flex-col w-full h-full relative">
      <Link href={href} className="flex flex-col h-full bg-white relative">
        
        {/* Minimalist Image Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f5f5f5] mb-6">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover object-center transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-400">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Tag */}
          {product.tag && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-black border border-black/10">
                {product.tag}
              </span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
          
          {/* subtle icon slide up */}
          <div className="absolute bottom-4 right-4 z-10 translate-y-8 opacity-0 transition-all duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex bg-white h-10 w-10 items-center justify-center rounded-full text-black shadow-lg">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Minimalist Details Section */}
        <div className="flex flex-col flex-1 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999] mb-2">
                {product.categorySlug}
              </p>
              <h3 className="text-lg font-bold uppercase tracking-tight text-black transition-colors group-hover:text-[var(--color-primary)] line-clamp-2">
                {product.name}
              </h3>
            </div>
          </div>

          <p className="mt-3 text-sm font-medium leading-relaxed text-[#666] line-clamp-2 pb-4">
            {product.description || "Premium sportswear manufactured for professional performance and durability."}
          </p>

          <div className="mt-auto pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#000]">
              Details
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] opacity-0 transition-opacity group-hover:opacity-100">
              View Specs →
            </span>
          </div>
        </div>
        
      </Link>
    </div>
  );
}
