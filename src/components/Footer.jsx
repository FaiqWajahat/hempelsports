"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const footerLinks = {
  products: [
    { name: "Tracksuits", href: "/categories/tracksuits" },
    { name: "Jackets", href: "/categories/jackets" },
    { name: "Hoodies & Sweatshirts", href: "/categories/hoodies" },
    { name: "Team Uniforms", href: "/categories/team-uniforms" },
  ],
  studio: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  business: [
    { name: "Request a Quote", href: "/quote" },
    { name: "Manufacturing Quality", href: "/about#values" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer className="bg-white pt-24 pb-12">
      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-16">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="max-w-sm">
            <Link href="/" className="inline-block mb-10">
              <div className="relative h-12 w-40">
                <Image 
                  src="/black-text-logo.png" 
                  alt="Hempel Sports" 
                  fill 
                  className="object-contain object-left" 
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-[#666]">
              A premium B2B sportswear manufacturing studio. Designing and scaling global brands with uncompromising quality and absolute precision.
            </p>
            
            <a 
              href="mailto:info@hempelsports.com" 
              className="group mt-10 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:text-[var(--color-primary)]"
            >
              Start a Project
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 transition-all group-hover:border-[var(--color-primary)]">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>

          {/* Minimalist Link Grid */}
          <div className="flex gap-16 md:gap-24 flex-wrap">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-8">Collections</p>
              <ul className="flex flex-col gap-4">
                {footerLinks.products.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs font-semibold uppercase tracking-wider text-black transition-colors hover:text-[var(--color-primary)]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-8">Studio</p>
              <ul className="flex flex-col gap-4">
                {footerLinks.studio.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs font-semibold uppercase tracking-wider text-[#666] transition-colors hover:text-black"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-8">Business</p>
              <ul className="flex flex-col gap-4">
                {footerLinks.business.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs font-semibold uppercase tracking-wider text-[#666] transition-colors hover:text-black"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Huge Outlined Text Background */}
        <div className="w-full flex justify-center mb-12">
          <span className="text-[clamp(4rem,15vw,16rem)] font-black uppercase tracking-tighter text-transparent select-none cursor-default" style={{ WebkitTextStroke: '2px #f0f0f0' }}>
            HEMPEL
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#f0f0f0] pt-8 text-[11px] font-bold uppercase tracking-widest text-[#999]">
          <p>&copy; {currentYear} HEMPEL SPORTS STUDIO.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <a href="#" className="transition hover:text-black">Instagram</a>
            <a href="#" className="transition hover:text-black">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
