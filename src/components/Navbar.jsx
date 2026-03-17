"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import { categories as allCategories } from "@/data/categories";
import SearchModal from "@/components/SearchModal";

const navLinks = [
  { href: "/", label: "Shop" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMobileCategories, setOpenMobileCategories] = useState({});

  const isSolidNav = scrolled || showMegaMenu || open;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredCategorySlugs = [
    "tracksuits",
    "jackets",
    "hoodies",
    "team-uniforms",
  ];

  const navCategories = allCategories.filter(
    (cat) => cat.isActive && featuredCategorySlugs.includes(cat.slug),
  );

  const isActive = (href) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleMobileCategory = (idx) => {
    setOpenMobileCategories((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isSolidNav
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.03)] border-b border-black/5" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-4 md:px-10 lg:px-16">

        {/* Left: Desktop Navigation */}
        <div className="hidden flex-1 items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isSolidNav
                    ? (active ? "text-[var(--color-primary)]" : "text-black hover:text-[var(--color-primary)]")
                    : (active ? "text-white" : "text-white/80 hover:text-white")
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full ${active ? "w-full" : ""}`} />
              </Link>
            );
          })}

          {/* Mega Menu Trigger */}
          <div
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
            className="h-full"
          >
            <button
              type="button"
              className={`group flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                isSolidNav
                  ? (pathname.startsWith("/categories") ? "text-[var(--color-primary)]" : "text-black hover:text-[var(--color-primary)]")
                  : (pathname.startsWith("/categories") || showMegaMenu ? "text-white" : "text-white/80 hover:text-white")
              }`}
            >
              Collections
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${showMegaMenu ? "rotate-180" : ""}`} />
              {(pathname.startsWith("/categories") && !showMegaMenu) && (
                <span className="absolute -bottom-1 left-0 h-px w-full bg-[var(--color-primary)]" />
              )}
            </button>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex flex-1 items-center justify-start md:justify-center">
          <Link href="/" className="group relative flex items-center justify-center">
            {/* The white text logo has different internal padding/dimensions than the black one, 
                so we adjust the container size dynamically to make them appear optically equal. */}
            <div className={`relative transition-all duration-500 ${isSolidNav ? "h-8 w-28 md:h-12 md:w-40" : "h-10 w-32 md:h-14 md:w-48"}`}>
              <Image 
                src={isSolidNav ? "/black-text-logo.png" : "/white-text-logo.png"} 
                alt="Hempel Sports" 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
          </Link>
        </div>

        {/* Right: CTAs */}
        <div className="flex flex-1 items-center justify-end gap-6 md:gap-8">
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className={`transition-colors duration-300 hover:scale-110 ${
              isSolidNav ? "text-black hover:text-[var(--color-primary)]" : "text-white/80 hover:text-white"
            }`}
            aria-label="Open search"
          >
            <Search className="h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={2.5} />
          </button>
          
          <Link
            href="/quote"
            className="hidden md:inline-flex relative overflow-hidden bg-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition-all hover:bg-[var(--color-primary)] hover:scale-[1.02]"
          >
            Get a Quote
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className={`flex items-center justify-center transition-colors md:hidden ${
              isSolidNav ? "text-black" : "text-white"
            }`}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle Navigation"
          >
            {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>

      </nav>

      {/* ── Full-Width Mega Menu (Minimalist) ── */}
      <AnimatePresence>
        {showMegaMenu && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.95, originY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.95, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
            className="absolute left-0 right-0 top-full border-t border-black/5 bg-white/95 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
          >
            <div className="mx-auto flex w-full max-w-[1600px] px-10 py-16 lg:px-16">

              {/* Left: Ultra Minimal Label */}
              <div className="w-64 shrink-0 border-r border-black/10 pr-12">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-black">
                  Our Range
                </h3>
                <p className="mt-4 text-xs leading-relaxed text-zinc-500">
                  Precision-engineered sportswear. Manufactured for global dominance.
                </p>
                <Link
                  href="/categories"
                  className="group mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black transition-colors hover:text-[var(--color-primary)]"
                >
                  View All Collection
                  <motion.span className="inline-block" initial={{ x: 0 }} whileHover={{ x: 4 }}>
                    →
                  </motion.span>
                </Link>
              </div>

              {/* Right: Stark columns */}
              <div className="grid flex-1 grid-cols-4 gap-12 pl-12">
                {navCategories.map((cat) => (
                  <div key={cat.slug} className="group/col">
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="mb-6 block"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:text-[var(--color-primary)]">
                        {cat.name}
                        <span className="ml-2 inline-block opacity-0 transition-opacity group-hover/col:opacity-100 text-[var(--color-primary)]">↗</span>
                      </span>
                    </Link>
                    <ul className="flex flex-col gap-4">
                      {cat.subcategories.map((sub) => {
                        const href = `/categories/${cat.slug}/${sub.slug}`;
                        const isCurrent = pathname === href;
                        return (
                          <li key={sub.slug}>
                            <Link
                              href={href}
                              className={`block text-[13px] font-medium transition-colors ${
                                isCurrent 
                                  ? "text-black" 
                                  : "text-zinc-400 hover:text-black"
                              }`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu (Full Screen Minimal) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full h-[calc(100vh-60px)] overflow-y-auto bg-white"
          >
            <div className="flex flex-col px-6 py-10">
              {/* Links */}
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-4xl font-black uppercase tracking-tighter text-black"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => { setSearchModalOpen(true); setOpen(false); }}
                  className="text-4xl font-black uppercase tracking-tighter text-black text-left"
                >
                  Search
                </button>
              </div>

              <div className="my-10 h-px w-full bg-black/10" />

              {/* Collections Accordion */}
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Collections</p>
              <div className="flex flex-col gap-4 pb-20">
                {navCategories.map((cat, idx) => (
                  <div key={cat.slug} className="border-b border-black/5 pb-4">
                    <button
                      onClick={() => toggleMobileCategory(idx)}
                      className="flex w-full items-center justify-between text-left text-xl font-bold tracking-tight text-black"
                    >
                      {cat.name}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${openMobileCategories[idx] ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {openMobileCategories[idx] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 flex flex-col gap-3">
                            {cat.subcategories.map((sub) => (
                              <li key={sub.slug}>
                                <Link
                                  href={`/categories/${cat.slug}/${sub.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="text-sm font-medium text-zinc-500"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                href={`/categories/${cat.slug}`}
                                onClick={() => setOpen(false)}
                                className="mt-2 block text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]"
                              >
                                View All {cat.name} →
                              </Link>
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </header>
  );
}
