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
    <div className="group flex flex-col w-full h-full relative transition-all duration-500 hover:-translate-y-1">
      <Link href={href} className="flex flex-col h-full bg-white relative overflow-hidden ring-1 ring-black/5 hover:ring-black/10 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
        
        {/* Image Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-white transition-colors duration-700">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain object-center p-2 transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-50 text-zinc-300">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
  
          {/* Tag */}
          {product.tag && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-black border border-black/10">
                {product.tag}
              </span>
            </div>
          )}
  
          {/* No Dark Hover Overlay for better product visibility */}
          
          {/* subtle icon slide up */}
          <div className="absolute bottom-4 right-4 z-10 translate-y-8 opacity-0 transition-all duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex bg-black h-10 w-10 items-center justify-center rounded-none text-white shadow-xl">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
        </div>
  
        {/* Details Section */}
        <div className="flex flex-col flex-1 p-6">
          <div className="flex flex-col gap-1 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
              {product.categorySlug?.replace(/-/g, ' ')}
            </p>
            <h3 className="text-xl font-black uppercase tracking-tighter text-black transition-colors group-hover:text-[var(--color-primary)] leading-tight">
              {product.name}
            </h3>
          </div>
  
          <p className="text-xs font-medium leading-relaxed text-[#888] line-clamp-2 mb-6">
            {product.description || "Premium sportswear manufactured for professional performance and durability."}
          </p>
  
          <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-black">
                Details
              </span>
              <div className="h-[1px] w-3 bg-black/40 transition-all duration-500 group-hover:w-8 group-hover:bg-[var(--color-primary)]" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-primary)] opacity-0 transition-opacity group-hover:opacity-100">
              View Specs
            </span>
          </div>
        </div>
        
      </Link>
    </div>
  );
}
